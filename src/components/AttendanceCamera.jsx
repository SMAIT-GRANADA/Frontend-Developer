import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Swal from "sweetalert2";

const ALLOWED_LATITUDE = -0.457833;
const ALLOWED_LONGITUDE = 117.1259754;
const ALLOWED_RADIUS = 0.5;

const AttendanceCamera = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const webcamRef = useRef(null);

  const checkLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("User location:", latitude, longitude);
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error accessing location:", error);
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

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc && userLocation) {
      checkLocationAndSubmit(imageSrc, userLocation);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Failed to capture photo or location unavailable.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }, [webcamRef, userLocation]);

  const checkLocationAndSubmit = (imageSrc, location) => {
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      ALLOWED_LATITUDE,
      ALLOWED_LONGITUDE
    );

    console.log("Distance from allowed location:", distance, "km");

    if (distance <= ALLOWED_RADIUS) {
      Swal.fire({
        title: "Success!",
        text: "Attendance recorded successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log("Attendance successful:", { imageSrc, ...location });
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
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Camera Attendance
        </h1>
        {userLocation && (
          <p className="mb-4 text-sm text-gray-600 text-center">
            Your location: {userLocation.latitude.toFixed(6)},{" "}
            {userLocation.longitude.toFixed(6)}
          </p>
        )}
        {!isCameraOpen ? (
          <button
            onClick={openCamera}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
              className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Capture Photo and Submit Attendance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCamera;
