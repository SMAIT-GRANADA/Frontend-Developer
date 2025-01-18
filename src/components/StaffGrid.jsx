import React, { useState, useRef } from "react";
import { staffData } from "../data/staffData";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StaffGrid = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef(null);
  const itemsPerSlide = 5;
  const totalSlides = Math.ceil(staffData.length / itemsPerSlide);

  const scrollToSlide = (slideIndex) => {
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.scrollWidth / totalSlides;
      scrollRef.current.scrollTo({
        left: slideWidth * slideIndex,
        behavior: "smooth",
      });
      setCurrentSlide(slideIndex);
    }
  };

  const nextSlide = () => {
    const newSlide = (currentSlide + 1) % totalSlides;
    scrollToSlide(newSlide);
  };

  const prevSlide = () => {
    const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    scrollToSlide(newSlide);
  };

  const handleScroll = (e) => {
    const scrollWidth = e.target.scrollWidth;
    const scrollPosition = e.target.scrollLeft;
    const slideWidth = scrollWidth / totalSlides;
    const newSlide = Math.round(scrollPosition / slideWidth);
    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide);
    }
  };

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 py-8 bg-white relative group"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h1 className="text-3xl font-bold text-center mb-12">
        Pengajar dan staf sekolah
      </h1>

      <div className="relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          onScroll={handleScroll}
        >
          <div className="flex gap-6 transition-all duration-500 ease-in-out min-w-max px-4">
            {staffData.map((staff) => (
              <div
                key={staff.id}
                className="flex flex-col items-center transform transition-all duration-500 ease-in-out w-64"
              >
                <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={staff.image}
                    alt={staff.name}
                    className="w-full h-full object-cover object-top transform transition-transform duration-300 hover:scale-110"
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

        <div
          className={`absolute inset-y-0 left-0 flex items-center transition-opacity duration-300 ${
            showArrows ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 -ml-4 z-10"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div
          className={`absolute inset-y-0 right-0 flex items-center transition-opacity duration-300 ${
            showArrows ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 -mr-4 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
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
