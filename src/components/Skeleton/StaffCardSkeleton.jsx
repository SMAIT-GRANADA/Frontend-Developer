import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StaffCardSkeleton = memo(() => (
  <div className="flex flex-col items-center w-64">
    <div className="w-full aspect-[3/4] mb-4">
      <Skeleton height="100%" style={{ aspectRatio: "3/4" }} />
    </div>
    <Skeleton width={150} height={24} className="mb-2" />
    <Skeleton width={100} height={20} />
  </div>
));

StaffCardSkeleton.displayName = "StaffCardSkeleton";
export default StaffCardSkeleton;
