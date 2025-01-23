import React, { useState } from "react";

const VideoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full bg-white relative z-10">
      <div className="mx-auto px-4 lg:px-0">
        <div className="relative">
          <video
            className="w-full shadow-lg"
            controls
            controlsList="nodownload"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata"
          >
            <source
              src="https://storage.googleapis.com/attandance_testing/Video%20profile/Profil%20SMA%20IT%20Granada%20Samarinda%202024%20-%20SMAIT%20Granada%20Samarinda%20(720p%2C%20h264).mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {!isPlaying && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden sm:block">
              <h1 className="text-3xl text-gray-700 text-center mb-4 text-shadow-lg">
                Video SMA IT Granada Samarinda Tahun 2024
              </h1>
              <p className="text-gray-700 mb-6 text-center text-shadow-md font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod
                <br /> tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .text-shadow-md {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default VideoPage;
