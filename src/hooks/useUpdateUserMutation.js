import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../services/user.service";

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};
