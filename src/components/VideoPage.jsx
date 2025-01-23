import React, { useState } from "react";

const VideoPage = () => {
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
