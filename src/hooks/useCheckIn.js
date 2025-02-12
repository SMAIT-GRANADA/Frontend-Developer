import { useMutation, useQuery } from "@tanstack/react-query";
import { checkIn, getTodayAttendance } from "../services/attedance.service";

export const useCheckIn = () => {
  return useMutation({
    mutationFn: checkIn,
  });
};

export const useTodayAttendance = () => {
  return useQuery({
    queryKey: ["todayAttendance"],
    queryFn: getTodayAttendance,
  });
};
