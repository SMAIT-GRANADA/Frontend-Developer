import { useMutation } from "@tanstack/react-query";
import { addUser } from "../services/user.service";

export const useAddUserMutation = () => {
  return useMutation({
    mutationFn: addUser,
  });
};
