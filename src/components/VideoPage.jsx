import React, { lazy, Suspense, useState } from "react";

const LazyVideo = lazy(() => import("./VideoComponent"));

const VideoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full h-screen bg-white relative z-10">
      <div className="h-full mx-auto px-4 lg:px-0">
        <Suspense
          fallback={<div className="w-full h-full bg-gray-200 animate-pulse" />}
        >
          <LazyVideo setIsPlaying={setIsPlaying} />
        </Suspense>
      </div>
    </div>
  );
};

export default VideoPage;
