import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import MapRegist from "../components/MapRegist";
import StaffGrid from "../components/StaffGrid";
import ProfilGranada from "../components/ProfileGranada";
import NewsLayout from "../components/NewsLayout";
import VideoPage from "../components/VideoPage";
import QuotesOfTheDay from "../components/QuotesOfTheDay";

const roleRoutes = {
  siswa: "/student",
  guru: "/teacher",
  admin: "/admin",
  superadmin: "/superadmin",
  ortu: "/parent",
};

const Home = () => {
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
    <>
      <Navbar />
      <div className="pt-28 lg:pt-32">
        <Hero />
        <Stats />
        <ProfilGranada />
        <div className="w-full bg-white pb-8">
          <VideoPage />
        </div>
        <div className="w-full bg-white py-8">
          <NewsLayout />
        </div>
        <div className="relative pb-20 md:pb-32 bg-transparent">
          <MapRegist />
        </div>
        <div className="w-full bg-[#F8FCF8]">
          <StaffGrid />
        </div>
        <QuotesOfTheDay />
        <Footer />
      </div>
    </>
  );
};

export default Home;
