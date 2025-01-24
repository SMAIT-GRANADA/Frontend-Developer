import Skeleton from "react-loading-skeleton";

const NewsCardSkeleton = ({ isMain = false }) => (
  <div className={`${isMain ? "col-span-full mb-8" : "mb-6"}`}>
    <Skeleton height={isMain ? 384 : 192} className="mb-4 rounded-lg" />
    <Skeleton width={100} className="mb-2" />
    <Skeleton height={isMain ? 28 : 24} className="mb-3" />
    <Skeleton count={2} />
  </div>
);

export default NewsCardSkeleton;
