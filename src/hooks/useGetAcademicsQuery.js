import { useQuery } from "@tanstack/react-query";
import { getAcademics } from "../services/academics.service";

export const useGetAcademicsQuery = () => {
  return useQuery({
    queryKey: ["academics"],
    queryFn: getAcademics,
  });
};
