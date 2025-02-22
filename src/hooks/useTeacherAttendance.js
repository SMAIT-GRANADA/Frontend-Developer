import { useMutation, useQuery } from "@tanstack/react-query";
import {
  teacherCheckIn,
  teacherCheckOut,
  getTeacherTodayAttendance,
  getTeacherAttendanceHistory,
} from "../services/attedance.service";

export const useTeacherCheckIn = () => {
  return useMutation({
    mutationFn: teacherCheckIn,
  });
};

export const useTeacherCheckOut = () => {
  return useMutation({
    mutationFn: teacherCheckOut,
  });
};

export const useTeacherTodayAttendance = () => {
  return useQuery({
    queryKey: ["teacherTodayAttendance"],
    queryFn: getTeacherTodayAttendance,
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 1000,
  });
};

export const useTeacherAttendanceHistory = () => {
  return useQuery({
    queryKey: ["teacherAttendanceHistory"],
    queryFn: getTeacherAttendanceHistory,
    staleTime: 0,
    cacheTime: 0,
    refetchInterval: 1000,
  });
};
