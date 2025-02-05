import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAcademicById,
  getStudents,
  postAcademic,
  updateAcademic,
} from "../services/student.service.teacher";

export const useGetStudentsQuery = (page, limit) => {
  return useQuery({
    queryKey: ["students", page, limit],
    queryFn: () => getStudents(page, limit),
  });
};

export const usePostAcademicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAcademic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
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
      queryClient.invalidateQueries(["academic"]);
    },
  });
};
