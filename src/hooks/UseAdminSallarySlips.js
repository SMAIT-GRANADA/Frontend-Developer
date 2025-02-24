import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSalarySlips,
  getTeachers,
  createSalarySlip,
  updateSalarySlip,
  deleteSalarySlip,
} from "../services/salary.service";

export const useTeachers = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });
};

export const useSalarySlips = () => {
  return useQuery({
    queryKey: ["salarySlips"],
    queryFn: getSalarySlips,
  });
};

export const useCreateSalarySlip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSalarySlip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salarySlips"] });
    },
  });
};

export const useUpdateSalarySlip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateSalarySlip(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salarySlips"] });
    },
  });
};

export const useDeleteSalarySlip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSalarySlip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salarySlips"] });
    },
  });
};
