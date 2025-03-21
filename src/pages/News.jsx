import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CircleArrowDown } from "lucide-react";
import NewsCard from "../components/NewsCard";
import NewsCardSkeleton from "../components/Skeleton/NewsCardSkeleton";
import NewsGridSkeleton from "../components/Skeleton/NewsGridSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNewsQuery } from "../hooks/useNewsQuery";

const News = () => {
  const [visibleNews, setVisibleNews] = useState(7); // Awalnya tampilkan 7 berita
  const [loading, setLoading] = useState(true);
  const loadMoreRef = useRef(null);

  const roleRoutes = {
    siswa: "/student",
    guru: "/teacher",
    admin: "/admin",
    superadmin: "/superadmin",
    ortu: "/parent",
  };

  const navigate = useNavigate();

  // Gunakan custom hook untuk fetch data
  const { data: newsData, isLoading } = useNewsQuery({ limit: 30, page: 1 });

  useEffect(() => {
    // Set loading state berdasarkan isLoading dari query
    setLoading(isLoading);
  }, [isLoading]);

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

  // Fungsi untuk menangani klik tombol "Lebih lainnya"
  const handleLoadMore = () => {
    setLoading(true);

    // Simulasi loading dengan setTimeout
    setTimeout(() => {
      setVisibleNews((prev) => prev + 7);
      setLoading(false);
    }, 500);
  };

  // Chunk array untuk membuat grid
  const getNewsChunks = () => {
    if (!newsData?.data || newsData.data.length === 0) return [];

    const chunks = [];
    // Mulai dari index 1 karena index 0 adalah berita utama
    for (let i = 1; i < Math.min(visibleNews, newsData.data.length); i += 3) {
      chunks.push(newsData.data.slice(i, i + 3));
    }

    return chunks;
  };

  // Chunks berita untuk ditampilkan dalam grid
  const newsChunks = getNewsChunks();

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
            {/* Berita utama */}
            {isLoading ? (
              <NewsCardSkeleton isMain={true} />
            ) : (
              newsData?.data[0] && (
                <NewsCard news={newsData.data[0]} isMain={true} />
              )
            )}

            {/* Grid berita */}
            {isLoading ? (
              <>
                <NewsGridSkeleton />
                <NewsGridSkeleton />
              </>
            ) : (
              newsChunks.map((chunk, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {chunk.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              ))
            )}

            {/* Loading indicator saat load more */}
            {loading && !isLoading && <NewsGridSkeleton />}
          </main>

          {/* Tombol Load More */}
          {newsData?.data && visibleNews < newsData.data.length && (
            <div className="flex justify-center mt-8" ref={loadMoreRef}>
              <button
                className="bg-yellow-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 transition-colors flex items-center"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading && !isLoading ? "Memuat..." : "Lebih lainnya"}{" "}
                <CircleArrowDown className="ml-2" />
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default News;
