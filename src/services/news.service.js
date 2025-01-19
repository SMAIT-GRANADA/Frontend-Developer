import axiosInstance from "../api/axiosInstance";

export const getNews = async (params) => {
  const { data } = await axiosInstance.get("news", { params });
  return data;
};
