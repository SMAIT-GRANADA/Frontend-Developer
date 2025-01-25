import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../services/resetPassword.service";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export const useForgotPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data, variables) => {
      Cookies.set("username", variables, { expires: 1 });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message,
      });
      navigate("/otp");
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
