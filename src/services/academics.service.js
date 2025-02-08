import axiosInstance from "../api/axiosInstance";

export const getAcademics = async () => {
  const response = await axiosInstance.get("/academic");
  return response.data;
};

export const getAcademicById = async (id) => {
  const response = await axiosInstance.get(`/academic/${id}`);
  return response.data;
};

export const updateAcademic = async ({ id, data }) => {
  const response = await axiosInstance.put(`/academic/${id}`, data);
  return response.data;
};

export const deleteAcademic = async (id) => {
  const response = await axiosInstance.delete(`/academic/${id}`);
  return response.data;
};
