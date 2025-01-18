import React, { useState } from "react";
import { staffData } from "../data/staffData";

const StaffGrid = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 5;
  const totalSlides = Math.ceil(staffData.length / itemsPerSlide);

  const startIndex = currentSlide * itemsPerSlide;
  const visibleStaff = staffData.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold text-center mb-12">
        Pengajar dan staf sekolah
      </h1>

      <div className="relative">
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 transition-all duration-500 ease-in-out">
            {visibleStaff.map((staff) => (
              <div
                key={staff.id}
                className="flex flex-col items-center transform transition-all duration-500 ease-in-out"
              >
                <div className="w-48 h-48 mb-4 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-semibold text-center">
                  {staff.name}
                </h3>
                <p className="text-gray-600 text-center">{staff.position}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-green-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffGrid;
