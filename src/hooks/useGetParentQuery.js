import { useQuery } from "@tanstack/react-query";
import { getParents } from "../services/user.service";

export const useGetParentsQuery = () => {
  return useQuery({
    queryKey: ["parents"],
    queryFn: getParents,
  });
};
