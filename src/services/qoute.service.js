import axiosInstance from "../api/axiosInstance";

export const fetchQuotes = async (page, limit) => {
  const response = await axiosInstance.get(
    `/quotes?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const deleteQuote = async (id) => {
  const response = await axiosInstance.delete(`/quotes/${id}`);
  return response.data;
};
