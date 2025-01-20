import Skeleton from "react-loading-skeleton";

const SideNewsSkeleton = () => (
  <div className="mb-6 pb-6">
    <div className="flex flex-col md:flex-row gap-4">
      <Skeleton className="w-full md:w-32 h-48 md:h-24 rounded-lg" />
      <div className="flex-1">
        <Skeleton width={100} className="mb-2" />
        <Skeleton height={20} className="mb-2" />
        <Skeleton count={2} />
      </div>
    </div>
  </div>
);

export default SideNewsSkeleton;
