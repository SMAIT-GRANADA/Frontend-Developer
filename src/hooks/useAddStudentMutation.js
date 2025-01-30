import { useMutation } from "@tanstack/react-query";
import { createStudents } from "../services/student.service";

export const useCreateStudentsMutation = () => {
  return useMutation({
    mutationFn: (data) => createStudents(data),
  });
};
