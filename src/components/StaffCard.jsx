import { memo } from "react";

const StaffCard = memo(({ staff }) => (
  <div className="flex flex-col items-center transform transition-all duration-500 ease-in-out w-64">
    <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded-lg shadow-lg">
      <img
        src={staff.image}
        alt={staff.name}
        className="w-full h-full object-cover object-center transform transition-transform duration-300 hover:scale-110"
        loading="lazy"
      />
    </div>
    <h3 className="text-lg font-semibold text-center">{staff.name}</h3>
    <p className="text-gray-600 text-center">{staff.position}</p>
  </div>
));

StaffCard.displayName = "StaffCard";
export default StaffCard;
