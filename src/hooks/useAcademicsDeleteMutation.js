import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAcademic } from "../services/academics.service";

export const useDeleteAcademicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAcademic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academics"] });
    },
  });
};
