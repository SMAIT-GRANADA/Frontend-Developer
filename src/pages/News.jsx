import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNewsQuery } from "../hooks/useNewsQuery";
import arrowRight from "../assets/arrow-right-circle.svg";
import NewsCard from "../components/NewsCard";
import NewsCardSkeleton from "../components/Skeleton/NewsCardSkeleton";
import NewsGrid from "../components/NewsGrid";
import NewsGridSkeleton from "../components/Skeleton/NewsGridSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const News = () => {
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

  const { data: newsData, isLoading } = useNewsQuery();

  return (
    <>
      <Navbar />
      <div className="pt-28 lg:pt-32 mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">BERITA GRANADA</h1>
            <p className="text-gray-600">
              Halaman ini menampilkan berbagai berita dan informasi terkini
              seputar SMAIT GRANADA. Temukan perkembangan terbaru, kegiatan
              sekolah, prestasi siswa, dan berbagai informasi penting lainnya
              yang menjadi bagian dari perjalanan pendidikan kami.
            </p>
            <div className="relative mt-8 h-px bg-[#949593]">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-1 bg-[#949593] rounded-full" />
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-1 bg-[#949593] rounded-full" />
            </div>
          </header>

          <main className="space-y-12">
            {isLoading ? (
              <>
                <NewsCardSkeleton isMain={true} />
                <NewsGridSkeleton />
                <NewsGridSkeleton />
              </>
            ) : (
              <>
                <NewsCard news={newsData?.data[0]} isMain={true} />
                <NewsGrid news={newsData?.data} startIndex={1} endIndex={4} />
                <NewsGrid news={newsData?.data} startIndex={4} endIndex={7} />
              </>
            )}
          </main>

          <div className="flex justify-center mt-8">
            <button className="bg-yellow-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 transition-colors flex items-center">
              Lebih lainnya
              <img
                src={arrowRight}
                alt="Arrow Right"
                className="ml-2 w-4 h-4"
              />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default News;
