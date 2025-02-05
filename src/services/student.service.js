import axiosInstance from "../api/axiosInstance";

export const getStudents = async ({ page, limit, showInactive = true }) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      showInactive: showInactive.toString(),
    });

    const response = await fetch(`/students?${params}`);
    if (!response.ok) throw new Error("Failed to fetch students");

    return response.json();
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
