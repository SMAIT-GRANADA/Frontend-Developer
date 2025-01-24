import axiosInstance from "../api/axiosInstance";

export const getUsers = async ({ page = 1, limit = 10 }) => {
  const response = await axiosInstance.get(
    `/users?page=${page}&limit=${limit}`
  );
  return response.data;
};
