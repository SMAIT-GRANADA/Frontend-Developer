export default function VideoComponent() {
  return (
    <div className="w-full h-full">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/BVsN0GXdqW0?modestbranding=1&controls=1&rel=0&showinfo=0"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
