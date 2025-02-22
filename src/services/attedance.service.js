import axiosInstance from "../api/axiosInstance";

export const checkIn = async ({ photoBase64, latitude, longitude }) => {
  const response = await axiosInstance.post("/attendance/check-in", {
    photoBase64,
    latitude,
    longitude,
  });
  return response.data;
};

export const getTodayAttendance = async () => {
  const response = await axiosInstance.get("/attendance/today");
  return response.data;
};

export const getAttendanceHistory = async () => {
  const response = await axiosInstance.get("/attendance/history");
  return response.data;
};

export const teacherCheckIn = async ({ photoBase64, latitude, longitude }) => {
  const response = await axiosInstance.post("/attendance/check-in", {
    photoBase64,
    latitude,
    longitude,
  });
  return response.data;
};

export const teacherCheckOut = async ({ photoBase64, latitude, longitude }) => {
  const response = await axiosInstance.post("/attendance/check-out", {
    photoBase64,
    latitude,
    longitude,
  });
  return response.data;
};

export const getTeacherTodayAttendance = async () => {
  const response = await axiosInstance.get("/attendance/today");
  return response.data;
};

export const getTeacherAttendanceHistory = async () => {
  const response = await axiosInstance.get("/attendance/history");
  return response.data;
};
