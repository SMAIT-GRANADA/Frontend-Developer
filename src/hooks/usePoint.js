import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPoints,
  createPoint,
  updatePoint,
  deletePoint,
} from "../services/point.service";

// Ubah untuk menerima params sebagai object
export const usePoints = ({ page = 1, limit = 10 } = {}) => {
  return useQuery({
    queryKey: ["points", page, limit],
    queryFn: () => fetchPoints({ page, limit }),
    keepPreviousData: true,
  });
};

export const useDeletePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePoint,
    onSuccess: () => {
      queryClient.invalidateQueries("points");
    },
  });
};

export const useCreatePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPoint,
    onSuccess: () => {
      queryClient.invalidateQueries("points");
    },
  });
};

export const useUpdatePoint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePoint,
    onSuccess: () => {
      queryClient.invalidateQueries("points");
    },
  });
};
