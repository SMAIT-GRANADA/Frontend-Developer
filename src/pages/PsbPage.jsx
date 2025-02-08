import Footer from "../components/Footer";
import MapRegist from "../components/MapRegist";
import Navbar from "../components/Navbar";
import RegistrationPaths from "../components/RegistrationPaths";
import psbBackground from "../assets/PSBBG.png";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect } from "react";

const PsbPage = () => {
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-24 md:mt-28 w-full relative">
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={psbBackground}
            alt="PSB Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10" />
        </div>
      </div>
      <div className="flex-grow bg-white">
        <RegistrationPaths />
      </div>
      <div className="relative pb-20 md:pb-32">
        <MapRegist />
      </div>
      <Footer />
    </div>
  );
};

export default PsbPage;
