import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/user.service";

export const useGetUserByIdQuery = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
