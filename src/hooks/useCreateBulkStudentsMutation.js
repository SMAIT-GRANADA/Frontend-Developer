import { useMutation } from "@tanstack/react-query";
import { createBulkStudents } from "../services/student.service";

export const useCreateBulkStudentsMutation = () => {
  return useMutation({
    mutationFn: (data) => createBulkStudents(data),
  });
};
