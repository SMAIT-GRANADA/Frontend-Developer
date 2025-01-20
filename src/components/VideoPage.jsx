import React from "react";
import imageYoutube from "../assets/VideoGranada.webp";

const VideoPage = () => {
  return (
    <div className="w-full bg-white py-10 relative z-10">
      <div className="container mx-auto px-4 lg:px-48 ">
        <h1 className="text-2xl font-bold text-center mb-4">
          Video SMA IT Granada Samarinda Tahun 2024
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex justify-center">
          <img
            src={imageYoutube}
            alt="Video SMA IT Granada Samarinda"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
