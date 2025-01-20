import React from "react";
import imageYoutube from "../assets/VideoGranada.webp";

const VideoPage = () => {
  return (
    <div className="w-full bg-white relative z-10">
      <div className="mx-auto px-4 lg:px-0">
        <div className="relative">
          <img
            src={imageYoutube}
            alt="Video SMA IT Granada Samarinda"
            className="w-full shadow-lg"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden sm:block">
            <h1 className="text-3xl text-white text-center mb-4 ">
              Video SMA IT Granada Samarinda Tahun 2024
            </h1>
            <p className="text-[#808380] mb-6 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
              <br /> tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
