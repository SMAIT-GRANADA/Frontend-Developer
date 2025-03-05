import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import {
  useTeacherCheckIn,
  useTeacherCheckOut,
} from "../../hooks/useTeacherAttendance";

const ALLOWED_LATITUDE = -6.317134;
const ALLOWED_LONGITUDE = 106.797087;
const ALLOWED_RADIUS = 0.5;

const TeacherAttendanceCamera = ({
  onSuccess,
  onClose,
  isCheckout = false,
}) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const webcamRef = useRef(null);

  const checkInMutation = useTeacherCheckIn();
  const checkOutMutation = useTeacherCheckOut();
  const currentMutation = isCheckout ? checkOutMutation : checkInMutation;

  const checkLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          Swal.fire({
            title: "Error!",
            text: "Unable to access your location. Please ensure GPS is active and location permission is granted.",
            icon: "error",
            confirmButtonText: "OK",
          });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      Swal.fire({
        title: "Error!",
        text: "Geolocation is not supported by your browser.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const openCamera = () => {
    checkLocation();
    setIsCameraOpen(true);
  };

  const captureImage = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc && userLocation) {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        ALLOWED_LATITUDE,
        ALLOWED_LONGITUDE
      );

      if (distance <= ALLOWED_RADIUS) {
        try {
          await currentMutation.mutateAsync({
            photoBase64: imageSrc,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          });

          Swal.fire({
            title: "Success!",
            text: `${
              isCheckout ? "Check-out" : "Check-in"
            } recorded successfully.`,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            onSuccess();
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: `Failed to submit ${
              isCheckout ? "check-out" : "check-in"
            }. Please try again.`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.fire({
          title: "Failed!",
          text: `You are ${distance.toFixed(
            2
          )} km from the allowed location. Maximum allowed distance is ${ALLOWED_RADIUS} km.`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }, [webcamRef, userLocation, currentMutation, isCheckout, onSuccess]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">
          Camera {isCheckout ? "Check-out" : "Check-in"}
        </h2>

        {userLocation && (
          <p className="text-sm text-gray-600 text-center">
            Your location: {userLocation.latitude.toFixed(6)},{" "}
            {userLocation.longitude.toFixed(6)}
          </p>
        )}

        {!isCameraOpen ? (
          <button
            onClick={openCamera}
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition duration-300"
          >
            Open Camera
          </button>
        ) : (
          <div className="space-y-4">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              className="w-full rounded-lg border border-gray-300"
            />
            <button
              onClick={captureImage}
              disabled={currentMutation.isPending}
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition duration-300 disabled:bg-emerald-300 disabled:cursor-not-allowed"
            >
              {currentMutation.isPending
                ? "Processing..."
                : "Capture Photo and Submit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherAttendanceCamera;
