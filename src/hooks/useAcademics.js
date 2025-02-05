import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAcademics,
  getAcademicById,
  updateAcademic,
} from "../services/academics.service";

export const useGetAcademicsQuery = () => {
  return useQuery({
    queryKey: ["academics"],
    queryFn: getAcademics,
  });
};

export const useGetAcademicByIdQuery = (id) => {
  return useQuery({
    queryKey: ["academic", id],
    queryFn: () => getAcademicById(id),
    enabled: !!id,
  });
};

export const useUpdateAcademicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAcademic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academics"] });
    },
  });
};
