import { useQuery } from "@tanstack/react-query";
import { getAttendanceHistory } from "../services/attedance.service";

export const useAttendanceHistory = () => {
  return useQuery({
    queryKey: ["attendanceHistory"],
    queryFn: getAttendanceHistory,
  });
};
