import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStaffGridQuery } from "../hooks/useStaffGridQuery";
import StaffCard from "./StaffCard";
import NavigationDots from "./NavigationDots";

const StaffGrid = () => {
  const {
    currentSlide,
    showArrows,
    scrollRef,
    totalSlides,
    staffData,
    isLoading,
    error,
    setShowArrows,
    scrollToSlide,
    nextSlide,
    prevSlide,
    handleScroll,
  } = useStaffGridQuery();

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading staff data
      </div>
    );

  return (
    <div
      className="w-full max-w-7xl mx-auto px-4 py-8 bg-[#F8FCF8] relative group"
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
              <StaffCard key={staff.id} staff={staff} />
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
            className="p-2 rounded-full bg-white shadow-lg hover:bg-yellow-400 -ml-4 z-10"
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
            className="p-2 rounded-full bg-white shadow-lg hover:bg-yellow-400 -mr-4 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <NavigationDots
          totalSlides={totalSlides}
          currentSlide={currentSlide}
          onDotClick={scrollToSlide}
        />
      </div>
    </div>
  );
};

export default StaffGrid;
