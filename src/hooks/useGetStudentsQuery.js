import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../services/student.service";

export const useGetStudentsQuery = (page, limit) => {
  return useQuery({
    queryKey: ["students", page, limit],
    queryFn: () => getStudents({ page, limit }),
    keepPreviousData: true,
  });
};
