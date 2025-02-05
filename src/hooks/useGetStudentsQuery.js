import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../services/student.service";

export const useGetStudentsQuery = (page, limit, showInactive = true) => {
  return useQuery({
    queryKey: ["students", page, limit, showInactive],
    queryFn: () => getStudents({ page, limit, showInactive }),
  });
};
