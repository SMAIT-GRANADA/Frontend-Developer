import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { user, tokens } = data.data;

      try {
        const decoded = jwtDecode(tokens.accessToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          throw new Error("Token expired");
        }

        Cookies.set("accessToken", tokens.accessToken, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });

        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: "Selamat datang kembali!",
          showConfirmButton: false,
          timer: 1500,
        });

        if (user.roles.includes("superadmin")) {
          navigate("/superadmin");
        } else if (user.roles.includes("admin")) {
          navigate("/admin");
        } else if (user.roles.includes("guru")) {
          navigate("/teacher");
        } else if (user.roles.includes("ortu")) {
          navigate("/parent");
        } else if (user.roles.includes("siswa")) {
          navigate("/student");
        }
      } catch (error) {
        Cookies.remove("accessToken", { path: "/" });
        throw new Error("Invalid token");
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan saat login",
      });
    },
  });
};
