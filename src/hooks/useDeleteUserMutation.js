import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../services/user.service";

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};
