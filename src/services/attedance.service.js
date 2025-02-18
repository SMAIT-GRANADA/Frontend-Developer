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
