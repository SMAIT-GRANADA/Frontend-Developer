import MainNews from "./MainNews";
import SideNews from "./SideNews";
import MainNewsSkeleton from "./Skeleton/MainNewsSkeleton";
import SideNewsSkeleton from "./Skeleton/SideNewsSkeleton";
import { useNewsQuery } from "../hooks/useNewsQuery";
import arrowRight from "../assets/arrow-right-circle.svg";

const NewsLayout = () => {
  const { data: newsData, isLoading } = useNewsQuery();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8 py-8 relative">
        <h1 className="text-4xl font-bold mb-4">BERITA GRANADA</h1>
        <p className="text-gray-600">
          Informasi terkini seputar kegiatan dan prestasi SMA IT GRANADA
        </p>
        <div className="flex justify-end">
          <button className="bg-yellow-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 transition-colors flex items-center">
            Lihat Semua
            <img src={arrowRight} alt="Arrow Right" className="ml-2 w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#949593]">
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1 h-1 bg-[#949593] rounded-full"></div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1 h-1 bg-[#949593] rounded-full"></div>
        </div>
      </header>

      <main className="grid lg:grid-cols-3 gap-8">
        {isLoading ? (
          <>
            <MainNewsSkeleton />
            <div className="lg:col-span-1">
              {[1, 2, 3].map((index) => (
                <SideNewsSkeleton key={index} />
              ))}
            </div>
          </>
        ) : (
          <>
            {newsData?.data[0] && <MainNews news={newsData.data[0]} />}
            <div className="lg:col-span-1">
              {newsData?.data.slice(1, 4).map((news, index) => (
                <SideNews
                  key={news.id}
                  news={news}
                  isLast={index === newsData.data.slice(1, 4).length - 1}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default NewsLayout;
