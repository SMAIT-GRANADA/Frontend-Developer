import axiosInstance from "../api/axiosInstance";

export const forgotPassword = async (username) => {
  const response = await axiosInstance.post("/auth/forgot-password", {
    username,
  });
  return response.data;
};

export const verifyOtp = async (otp) => {
  const response = await axiosInstance.post("/auth/verify-otp", { otp });
  return response.data;
};

export const resetPassword = async ({
  resetToken,
  newPassword,
  confirmPassword,
}) => {
  const response = await axiosInstance.post("/auth/reset-password", {
    resetToken,
    newPassword,
    confirmPassword,
  });
  return response.data;
};
