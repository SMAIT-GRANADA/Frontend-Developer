import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../services/resetPassword.service";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const useVerifyOtpMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      Cookies.set("resetToken", data.data.resetToken);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
      });
      navigate("/reset-password");
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    },
  });
};
