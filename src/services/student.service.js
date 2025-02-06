import axiosInstance from "../api/axiosInstance";

export const getStudents = async ({ page, limit, showInactive = true }) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await axiosInstance.get(`/students?${params}`);

    if (!showInactive) {
      response.data.data = response.data.data.filter(
        (student) => student.isActive
      );
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBulkStudents = async (payload) => {
  const response = await axiosInstance.post("/students/bulk", payload);
  return response.data;
};

export const updateStudent = async ({
  studentId,
  name,
  nisn,
  className,
  parentId,
  isActive,
}) => {
  const response = await axiosInstance.put(`/students/class`, {
    students: [
      {
        id: studentId,
        name,
        nisn,
        className,
        parentId,
        isActive,
      },
    ],
  });
  return response.data;
};
