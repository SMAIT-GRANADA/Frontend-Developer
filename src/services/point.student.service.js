import axiosInstance from "../api/axiosInstance";

export const getPoints = async () => {
  const response = await axiosInstance.get("points");
  return response.data;
};
