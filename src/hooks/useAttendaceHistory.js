import { useMutation, useQuery } from "@tanstack/react-query";
import {
  exportAttendance,
  getAllAttendance,
  getAttendanceHistory,
  updateAttendance,
} from "../services/attedance.service";

export const useAttendanceHistory = () => {
  return useQuery({
    queryKey: ["attendanceHistory"],
    queryFn: getAttendanceHistory,
    staleTime: 0,
    gcTime: 0,
    refetchInterval: 1000,
  });
};

export const useGetAllAttendanceQuery = (page, limit) => {
  return useQuery({
    queryKey: ["allAttendance", page, limit],
    queryFn: () => getAllAttendance(),
    scaleTime: 0,
    gcTime: 0,
    refetchInterval: 1000,
  });
};

export const useUpdateAttendanceMutation = () => {
  return useMutation({
    mutationFn: ({ id, data }) => updateAttendance(id, data),
  });
};

export const useExportAttendanceMutation = () => {
  return useMutation({
    mutationFn: exportAttendance,
  });
};
