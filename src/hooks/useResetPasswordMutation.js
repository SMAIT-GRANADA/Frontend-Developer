import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../services/resetPassword.service";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      Cookies.remove("resetToken");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
      });
      navigate("/login");
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
