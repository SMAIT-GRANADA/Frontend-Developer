import axiosInstance from "../api/axiosInstance";

export const getStudents = async ({ page = 1, limit = 10 }) => {
  const response = await axiosInstance.get(
    `/students?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const createStudents = async (students) => {
  try {
    // Kirim data langsung tanpa wrapping dalam students array
    const response = await axiosInstance.post("/students/bulk", students);
    return response.data;
  } catch (error) {
    // Tambahkan logging untuk debug
    console.error("Error creating students:", {
      requestData: students,
      error: error.response?.data,
    });
    throw error;
  }
};

export const createBulkStudents = async (data) => {
  const response = await axiosInstance.post("/students/bulk", data);
  return response.data;
};

// Update student class
export const updateClass = async ({ studentId, className }) => {
  const response = await axiosInstance.put(`/students/class`, {
    studentId,
    className,
  });
  return response.data;
};
