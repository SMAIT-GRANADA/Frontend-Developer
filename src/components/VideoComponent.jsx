const VideoComponent = ({ setIsPlaying }) => (
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
);

export default VideoComponent;
