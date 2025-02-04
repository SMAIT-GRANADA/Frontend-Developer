import axiosInstance from "../api/axiosInstance";

export const getStudents = async ({ page = 1, limit = 10 }) => {
  const response = await axiosInstance.get(
    `/students?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const createBulkStudents = async (payload) => {
  const response = await axiosInstance.post("/students/bulk", payload);
  return response.data;
};

export const updateClass = async ({ studentId, className }) => {
  const response = await axiosInstance.put(`/students/class`, {
    studentId,
    className,
  });
  return response.data;
};
