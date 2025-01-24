import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/user.service";

export const useGetUsersQuery = (page, limit) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers({ page, limit }),
    keepPreviousData: true,
  });
};
