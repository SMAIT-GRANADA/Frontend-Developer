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
  ({ direction, onClick, showArrows, disabled, children }) => (
    <div
      className={`absolute inset-y-0 ${
        direction === "left" ? "left-0" : "right-0"
      } flex items-center transition-opacity duration-300 ${
        showArrows ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded-full bg-white shadow-lg hover:bg-yellow-400 z-10 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
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
    isFetching,
    error,
    setShowArrows,
    scrollToSlide,
    nextSlide,
    prevSlide,
    handleScroll,
  } = useStaffGridQuery();

  if (error) {
    return (
      <StaffGridContainer>
        <div className="flex flex-col items-center justify-center py-12 px-4 rounded-lg bg-white shadow-sm border border-red-100">
          <div className="text-red-500 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Gagal memuat data
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Terjadi kendala saat memuat data pengajar dan staf. Silakan coba
            kembali nanti.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-md 
                     transition-colors duration-300 font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
            </svg>
            Coba lagi
          </button>
        </div>
      </StaffGridContainer>
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

    if (staffData.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No staff data available
        </div>
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
          className={`overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory ${
            isFetching ? "opacity-50" : ""
          }`}
          onScroll={handleScroll}
        >
          <div className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-4 gap-6 transition-all duration-500 ease-in-out px-8 sm:px-4">
            {staffData.map((staff) => (
              <div key={staff.id} className="snap-center flex justify-center">
                <StaffCard
                  staff={{
                    ...staff,
                    image: staff.imageUrl,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {!isLoading && staffData.length > 0 && (
          <>
            <NavigationButton
              direction="left"
              onClick={prevSlide}
              showArrows={showArrows}
              disabled={currentSlide === 0}
            >
              <ChevronLeft size={24} />
            </NavigationButton>

            <NavigationButton
              direction="right"
              onClick={nextSlide}
              showArrows={showArrows}
              disabled={currentSlide === totalSlides - 1}
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
