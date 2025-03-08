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
    const date1 = new Date(today);
    const date2 = new Date(startDate);
    return Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
  };

  // Use React Query for data fetching with caching
  return useQuery({
    queryKey: ["dailyQuote", getCurrentLocalDate()],
    queryFn: async () => {
      const today = getCurrentLocalDate();
      const startDate = "2024-01-01";
      const daysDiff = getDayDifference(today, startDate);

      const response = await getQuotes({ page: 1, limit: 100 });

      if (response.status && response.data.length > 0) {
        const index = daysDiff % response.data.length;
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
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
