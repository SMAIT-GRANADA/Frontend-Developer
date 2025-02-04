import { useQuery } from "@tanstack/react-query";
import { getPoints } from "../services/point.student.service";

export const useGetPointsQuery = () => {
  return useQuery({
    queryKey: ["points"],
    queryFn: getPoints,
  });
};
