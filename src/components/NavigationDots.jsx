import { memo } from "react";

const NavigationDots = memo(({ totalSlides, currentSlide, onDotClick }) => (
  <div className="flex justify-center mt-8 gap-2">
    <div className="flex gap-2">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentSlide === index
              ? "bg-green-600 scale-110"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        />
      ))}
    </div>
  </div>
));

NavigationDots.displayName = "NavigationDots";
export default NavigationDots;
