import { useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStaffData } from "../services/staff.service";

export const useStaffGridQuery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef(null);
  const itemsPerSlide = 4;

  const {
    data: staffResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["staffData", currentPage],
    queryFn: () => fetchStaffData(currentPage, itemsPerSlide),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const staffData = staffResponse?.data || [];
  const totalPages = staffResponse?.meta?.totalPages || 1;

  const scrollToSlide = useCallback(
    (slideIndex) => {
      if (scrollRef.current) {
        const slideWidth = scrollRef.current.scrollWidth / totalPages;
        scrollRef.current.scrollTo({
          left: slideWidth * slideIndex,
          behavior: slideIndex === 0 ? "auto" : "smooth",
        });
        setCurrentSlide(slideIndex);
        setCurrentPage(slideIndex + 1);
      }
    },
    [totalPages]
  );

  const nextSlide = useCallback(() => {
    const newSlide = (currentSlide + 1) % totalPages;
    scrollToSlide(newSlide);
  }, [currentSlide, totalPages, scrollToSlide]);

  const prevSlide = useCallback(() => {
    const newSlide = (currentSlide - 1 + totalPages) % totalPages;
    scrollToSlide(newSlide);
  }, [currentSlide, totalPages, scrollToSlide]);

  const handleScroll = useCallback(
    (e) => {
      const scrollWidth = e.target.scrollWidth;
      const scrollPosition = e.target.scrollLeft;
      const slideWidth = scrollWidth / totalPages;
      const newSlide = Math.round(scrollPosition / slideWidth);
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide);
        setCurrentPage(newSlide + 1);
      }
    },
    [currentSlide, totalPages]
  );

  return {
    currentSlide,
    showArrows,
    scrollRef,
    totalSlides: totalPages,
    staffData,
    isLoading,
    error,
    setShowArrows,
    scrollToSlide,
    nextSlide,
    prevSlide,
    handleScroll,
    itemsPerSlide,
  };
};
