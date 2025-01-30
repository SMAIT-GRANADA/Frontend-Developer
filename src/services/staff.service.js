import axiosInstance from "../api/axiosInstance";

export const fetchStaffData = async (page = 1, limit = 4) => {
  try {
    const response = await axiosInstance.get(
      `staff?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch staff data");
  }
};
