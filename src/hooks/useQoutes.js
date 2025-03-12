import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  fetchQuotes,
  deleteQuote,
  createQuote,
  updateQuote,
  getQuotes,
} from "../services/qoute.service";

export const useQuotes = (page, limit) => {
  return useQuery({
    queryKey: ["quotes", page, limit],
    queryFn: () => fetchQuotes(page, limit),
    keepPreviousData: true,
  });
};

export const useDeleteQuote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteQuote,
    onSuccess: () => {
      queryClient.invalidateQueries("quotes");
    },
  });
};

export const useCreateQuote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuote,
    onSuccess: () => {
      queryClient.invalidateQueries("quotes");
    },
  });
};

export const useUpdateQuote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateQuote,
    onSuccess: () => {
      queryClient.invalidateQueries("quotes");
    },
  });
};

// --- Improved hook for daily quotes using local time ---
export const useGetDailyQuote = () => {
  // Get current date in local time format YYYY-MM-DD
  const getCurrentLocalDate = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")}`;
  };

  // Calculate day difference using local time
  const getDayDifference = (today, startDate) => {
    // Create date objects without time component to avoid time zone issues
    const date1 = new Date(today + "T00:00:00");
    const date2 = new Date(startDate + "T00:00:00");

    const diffTime = date1.getTime() - date2.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Ensure we always get a positive number
    return Math.abs(diffDays);
  };

  // Use React Query for data fetching with caching
  return useQuery({
    queryKey: ["dailyQuote", getCurrentLocalDate()],
    queryFn: async () => {
      const today = getCurrentLocalDate();
      const startDate = "2024-01-01"; // Fixed start date
      const daysDiff = getDayDifference(today, startDate);

      try {
        const response = await getQuotes({ page: 1, limit: 100 });

        if (response.status && response.data && response.data.length > 0) {
          // Get quotes count to ensure proper cycling
          const quotesCount = response.data.length;

          // Calculate index with explicit modulo to ensure proper cycling
          const index = daysDiff % quotesCount;

          console.log(
            `Day difference: ${daysDiff}, Quotes count: ${quotesCount}, Selected index: ${index}`
          );

          return {
            quote: response.data[index].content,
            isEmpty: false,
          };
        } else {
          return {
            quote: "",
            isEmpty: true,
          };
        }
      } catch (error) {
        console.error("Error fetching daily quote:", error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
