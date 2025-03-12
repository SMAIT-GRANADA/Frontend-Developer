import { useState, useRef, useCallback, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchStaffData } from "../services/staff.service";

export const useStaffGridQuery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const scrollRef = useRef(null);
  const itemsPerSlide = 4;
  const queryClient = useQueryClient();

  const {
    data: staffResponse,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["staffData", currentPage],
    queryFn: () => fetchStaffData(currentPage, itemsPerSlide),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    keepPreviousData: true,
  });

  const staffData = staffResponse?.data || [];
  const totalPages = staffResponse?.meta?.totalPages || 1;

  // Prefetch data untuk halaman berikutnya dengan format queryKey yang benar
  useEffect(() => {
    if (currentPage < totalPages) {
      // Perbaikan di sini - format queryKey sebagai array
      queryClient.prefetchQuery({
        queryKey: ["staffData", currentPage + 1],
        queryFn: () => fetchStaffData(currentPage + 1, itemsPerSlide),
      });
    }
  }, [currentPage, totalPages, itemsPerSlide, queryClient]);

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
    if (currentSlide < totalPages - 1) {
      const newSlide = currentSlide + 1;
      if (!isFetching) {
        setCurrentSlide(newSlide);
        setCurrentPage(newSlide + 1);
        scrollToSlide(newSlide);
      }
    }
  }, [currentSlide, totalPages, isFetching, scrollToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1;
      setCurrentSlide(newSlide);
      setCurrentPage(newSlide + 1);
    }
  }, [currentSlide]);

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
    isFetching,
    error,
    setShowArrows,
    scrollToSlide,
    nextSlide,
    prevSlide,
    handleScroll,
    itemsPerSlide,
  };
};
