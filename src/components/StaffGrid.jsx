import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStaffGridQuery } from "../hooks/useStaffGridQuery";
import { memo } from "react";
import StaffCard from "./StaffCard";
import StaffCardSkeleton from "./Skeleton/StaffCardSkeleton";
import NavigationDots from "./NavigationDots";
import { SkeletonTheme } from "react-loading-skeleton";

const StaffGridContainer = memo(({ children, onMouseEnter, onMouseLeave }) => (
  <div
    className="w-full max-w-6xl mx-auto px-4 py-8 bg-[#F8FCF8] relative group"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <h1 className="text-3xl font-bold text-center mb-12">
      Pengajar dan staf sekolah
    </h1>
    {children}
  </div>
));

StaffGridContainer.displayName = "StaffGridContainer";

const NavigationButton = memo(
  ({ direction, onClick, showArrows, children }) => (
    <div
      className={`absolute inset-y-0 ${
        direction === "left" ? "left-0" : "right-0"
      } flex items-center transition-opacity duration-300 ${
        showArrows ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        onClick={onClick}
        className="p-2 rounded-full bg-white shadow-lg hover:bg-yellow-400 z-10"
        style={{ margin: direction === "left" ? "0 0 0 -1rem" : "0 -1rem 0 0" }}
        aria-label={direction === "left" ? "Previous slide" : "Next slide"}
      >
        {children}
      </button>
    </div>
  )
);

NavigationButton.displayName = "NavigationButton";

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

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading staff data
      </div>
    );
  }

  const renderStaffCards = () => {
    if (isLoading) {
      return (
        <SkeletonTheme baseColor="#f0f0f0" highlightColor="#f8f8f8">
          {Array.from({ length: 4 }).map((_, index) => (
            <StaffCardSkeleton key={index} />
          ))}
        </SkeletonTheme>
      );
    }

    return staffData.map((staff) => (
      <StaffCard
        key={staff.id}
        staff={{
          ...staff,
          image: staff.imageUrl,
        }}
      />
    ));
  };

  return (
    <StaffGridContainer
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div className="relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          onScroll={handleScroll}
        >
          <div className="flex gap-6 transition-all duration-500 ease-in-out min-w-max px-4">
            {renderStaffCards()}
          </div>
        </div>

        {!isLoading && (
          <>
            <NavigationButton
              direction="left"
              onClick={prevSlide}
              showArrows={showArrows}
            >
              <ChevronLeft size={24} />
            </NavigationButton>

            <NavigationButton
              direction="right"
              onClick={nextSlide}
              showArrows={showArrows}
            >
              <ChevronRight size={24} />
            </NavigationButton>

            <NavigationDots
              totalSlides={totalSlides}
              currentSlide={currentSlide}
              onDotClick={scrollToSlide}
            />
          </>
        )}
      </div>
    </StaffGridContainer>
  );
};

export default StaffGrid;
