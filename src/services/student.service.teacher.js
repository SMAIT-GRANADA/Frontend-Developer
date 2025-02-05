import axiosInstance from "../api/axiosInstance";

export const getStudents = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(
    `/students?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const postAcademic = async (data) => {
  const response = await axiosInstance.post("/academic", data);
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
