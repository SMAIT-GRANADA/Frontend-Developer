import LoginForm from "../components/LoginForm";
import loginBanner from "../assets/granada-school.webp";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect } from "react";

const LoginPage = () => {
  const roleRoutes = {
    siswa: "/student",
    guru: "/teacher",
    admin: "/admin",
    superadmin: "/superadmin",
    ortu: "/parent",
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userRole = decoded.roles[0]?.toLowerCase();

        if (userRole && roleRoutes[userRole]) {
          navigate(roleRoutes[userRole], { replace: true });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        Cookies.remove("accessToken", { path: "/" });
      }
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginBanner})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
