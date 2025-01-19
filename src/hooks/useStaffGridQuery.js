import { useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStaffData } from "../data/staffData";

export const useStaffGridQuery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef(null);
  const itemsPerSlide = 5;

  const {
    data: staffData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["staffData"],
    queryFn: fetchStaffData,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const totalSlides = Math.ceil(staffData.length / itemsPerSlide);

  const scrollToSlide = useCallback(
    (slideIndex) => {
      if (scrollRef.current) {
        const slideWidth = scrollRef.current.scrollWidth / totalSlides;
        scrollRef.current.scrollTo({
          left: slideWidth * slideIndex,
          behavior: slideIndex === 0 ? "auto" : "smooth",
        });
        setCurrentSlide(slideIndex);
      }
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => {
    const newSlide = (currentSlide + 1) % totalSlides;
    scrollToSlide(newSlide);
  }, [currentSlide, totalSlides, scrollToSlide]);

  const prevSlide = useCallback(() => {
    const newSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    scrollToSlide(newSlide);
  }, [currentSlide, totalSlides, scrollToSlide]);

  const handleScroll = useCallback(
    (e) => {
      const scrollWidth = e.target.scrollWidth;
      const scrollPosition = e.target.scrollLeft;
      const slideWidth = scrollWidth / totalSlides;
      const newSlide = Math.round(scrollPosition / slideWidth);
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
      }
    },
    [currentSlide, totalSlides]
  );

  return {
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
  };
};
