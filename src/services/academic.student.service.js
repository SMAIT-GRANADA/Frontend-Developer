import axiosInstance from "../api/axiosInstance";

export const getAcademics = async () => {
  const response = await axiosInstance.get("academic");
  return response.data;
};
