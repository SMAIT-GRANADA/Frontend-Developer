import axiosInstance from "../api/axiosInstance";

export const fetchPoints = async (params) => {
  const response = await axiosInstance.get("/points", { params });
  return response.data;
};

export const createPoint = async (data) => {
  const response = await axiosInstance.post("/points", data);
  return response.data;
};

export const updatePoint = async ({ id, data }) => {
  const response = await axiosInstance.put(`/points/${id}`, data);
  return response.data;
};

export const deletePoint = async (id) => {
  const response = await axiosInstance.delete(`/points/${id}`);
  return response.data;
};
