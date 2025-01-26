import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchQuotes,
  deleteQuote,
  createQuote,
  updateQuote,
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
