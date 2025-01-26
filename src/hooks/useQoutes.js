import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
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

export const useGetQuotes = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyQuote = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split("T")[0];
        const startDate = new Date("2024-01-01").toISOString().split("T")[0];
        const daysDiff = Math.floor(
          (new Date(today) - new Date(startDate)) / (1000 * 60 * 60 * 24)
        );

        const response = await getQuotes({ page: 1, limit: 100 });

        if (response.status && response.data.length > 0) {
          const index = daysDiff % response.data.length;
          setQuote(response.data[index].content);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyQuote();
  }, []);

  return { quote, loading, error };
};
