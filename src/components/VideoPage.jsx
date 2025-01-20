import React from "react";
import imageYoutube from "../assets/VideoGranada.webp";

const VideoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Video SMA IT Granada Samarinda Tahun 2024
        </h1>
        <p className="text-gray-700 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex justify-center">
          <img
            src={imageYoutube}
            alt="Video SMA IT Granada Samarinda"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
