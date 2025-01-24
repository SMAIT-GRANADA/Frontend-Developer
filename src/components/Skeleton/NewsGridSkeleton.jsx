import NewsCardSkeleton from "./NewsCardSkeleton";

const NewsGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[1, 2, 3].map((index) => (
      <NewsCardSkeleton key={index} />
    ))}
  </div>
);

export default NewsGridSkeleton;
