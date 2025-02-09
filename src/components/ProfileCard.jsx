import React from "react";

const ProfileCard = ({ imageUrl }) => {
  return (
    <div className="relative w-[351px] p-2">
      <div className="absolute top-0 left-0 w-16 h-[2px] ml-2 bg-[#F9DE4B]"></div>

      <div className="absolute top-0 left-0 w-[2px] h-16 bg-[#F9DE4B] mt-5"></div>

      <div className="absolute bottom-0 right-0 w-16 h-[2px] mr-2 bg-[#F9DE4B]"></div>

      <div className="rounded-sm overflow-hidden">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ProfileCard;
