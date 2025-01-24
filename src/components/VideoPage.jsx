import React, { lazy, Suspense, useState } from "react";
const LazyVideo = lazy(() => import("./VideoComponent"));

const VideoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full bg-white relative z-10">
      <div className="mx-auto px-4 lg:px-0">
        <div className="relative">
          <Suspense
            fallback={<div className="w-full h-64 bg-gray-200 animate-pulse" />}
          >
            <LazyVideo setIsPlaying={setIsPlaying} />
          </Suspense>
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
