import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import { useCheckIn } from "../hooks/useCheckIn";

const ALLOWED_LATITUDE = -6.22592;
const ALLOWED_LONGITUDE = 106.830234;
const ALLOWED_RADIUS = 0.5;

const AttendanceCamera = ({ onSuccess, onClose }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const webcamRef = useRef(null);
  const checkInMutation = useCheckIn();

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
          await checkInMutation.mutateAsync({
            photoBase64: imageSrc,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          });

          Swal.fire({
            title: "Success!",
            text: "Attendance recorded successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            onSuccess();
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to submit attendance. Please try again.",
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
    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to capture photo or location unavailable.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [webcamRef, userLocation, checkInMutation, onSuccess]);

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
    const distance = R * c;
    return distance;
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
        <h2 className="text-xl font-semibold text-center">Camera Attendance</h2>

        {userLocation && (
          <p className="text-sm text-gray-600 text-center">
            Your location: {userLocation.latitude.toFixed(6)},{" "}
            {userLocation.longitude.toFixed(6)}
          </p>
        )}

        {!isCameraOpen ? (
          <button
            onClick={openCamera}
            className="w-full bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500 transition duration-300"
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
              disabled={checkInMutation.isPending}
              className="w-full bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500 transition duration-300 disabled:bg-yellow-200 disabled:cursor-not-allowed"
            >
              {checkInMutation.isPending
                ? "Submitting..."
                : "Capture Photo and Submit Attendance"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCamera;
