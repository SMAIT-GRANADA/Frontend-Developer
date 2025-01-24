import axiosInstance from "../api/axiosInstance";

// Get all users
export const getUsers = async ({ page = 1, limit = 10 }) => {
  const response = await axiosInstance.get(
    `/users?page=${page}&limit=${limit}`
  );
  return response.data;
};

// Add user
export const addUser = async (userData) => {
  const response = await axiosInstance.post("/users", userData);
  return response.data;
};
