import { useMutation } from "@tanstack/react-query";
import { updateClass } from "../services/student.service";

export const useUpdateClassMutation = () => {
  return useMutation({
    mutationFn: (data) => updateClass(data),
  });
};
