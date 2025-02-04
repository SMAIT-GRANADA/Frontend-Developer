import { useMutation } from "@tanstack/react-query";
import { createBulkStudents } from "../services/student.service";

export const useCreateStudentsMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const payload = {
        students: data.map((student) => ({
          name: student.name?.trim() || "",
          className: student.className?.trim() || "",
        })),
      };

      return await createBulkStudents(payload);
    },
  });
};
