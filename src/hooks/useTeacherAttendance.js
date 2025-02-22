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
  });
};

export const useTeacherAttendanceHistory = () => {
  return useQuery({
    queryKey: ["teacherAttendanceHistory"],
    queryFn: getTeacherAttendanceHistory,
  });
};
