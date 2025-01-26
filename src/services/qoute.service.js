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

export const createQuote = async (data) => {
  const response = await axiosInstance.post("/quotes", data);
  return response.data;
};

export const updateQuote = async ({ id, data }) => {
  const response = await axiosInstance.put(`/quotes/${id}`, data);
  return response.data;
};
export const getQuotes = async (params) => {
  const response = await axiosInstance.get("/quotes", { params });
  return response.data;
};
