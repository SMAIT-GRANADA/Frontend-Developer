import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudent } from "../services/student.service";

export const useUpdateStudentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
    },
  });
};
