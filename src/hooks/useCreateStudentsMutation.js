import { useMutation } from "@tanstack/react-query";
import { createStudents } from "../services/student.service";

export const useCreateStudentsMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      // Format data sebelum dikirim
      const formattedData = data.map((student) => ({
        name: student.name?.trim(),
        class_name: student.className?.trim(), // Sesuaikan dengan model di backend
        parent_id: student.parentId || null, // Sesuaikan dengan model di backend
        is_active: true, // Sesuaikan dengan model di backend
      }));

      console.log("Formatted data to be sent:", formattedData);
      return await createStudents(formattedData);
    },
  });
};
