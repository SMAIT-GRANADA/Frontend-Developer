// services/salaryService.js
import axiosInstance from "../api/axiosInstance";

export const getSalarySlips = async () => {
  const response = await axiosInstance.get("/salary-slips");
  return response.data;
};

export const createSalarySlip = async (formData) => {
  const response = await axiosInstance.post("/salary-slips", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateSalarySlip = async (id, formData) => {
  const response = await axiosInstance.put(`/salary-slips/${id}`, formData);
  return response.data;
};

export const deleteSalarySlip = async (id) => {
  const response = await axiosInstance.delete(`/salary-slips/${id}`);
  return response.data;
};
