import Skeleton from "react-loading-skeleton";

const MainNewsSkeleton = () => (
  <div className="lg:col-span-2 mb-8 lg:mb-0">
    <Skeleton height={384} className="mb-4 rounded-lg" />
    <Skeleton width={100} className="mb-2" />
    <Skeleton height={28} className="mb-3" />
    <Skeleton count={3} />
  </div>
);

export default MainNewsSkeleton;
