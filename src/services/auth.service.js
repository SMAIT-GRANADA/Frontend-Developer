import axiosInstance from "../api/axiosInstance";

export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
};
