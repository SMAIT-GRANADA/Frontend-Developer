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

export const updateStudent = async ({
  studentId,
  name,
  className,
  parentId,
}) => {
  const response = await axiosInstance.put(`/students/class`, {
    students: [
      {
        id: studentId,
        name,
        className,
        parentId,
      },
    ],
  });
  return response.data;
};
