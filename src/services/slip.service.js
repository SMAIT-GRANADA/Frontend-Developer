import axiosInstance from "../api/axiosInstance";

export const salarySlipService = {
  async getSalarySlips() {
    try {
      const response = await axiosInstance.get("/salary-slips");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch salary slips"
      );
    }
  },

  async getSalarySlipById(id) {
    try {
      const response = await axiosInstance.get(`/salary-slips/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch salary slip"
      );
    }
  },
};
