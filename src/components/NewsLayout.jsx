import MainNews from "./MainNews";
import SideNews from "./SideNews";
import { dummyNews } from "../data/dummyNews";

const NewsLayout = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">BERITA GRANADA</h1>
        <p className="text-gray-600">
          Informasi terkini seputar kegiatan dan prestasi SMA IT GRANADA
        </p>
        <div className="flex justify-end">
          <button className="bg-yellow-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-500 transition-colors">
            Lihat Semua
          </button>
        </div>
      </header>

      <main className="grid lg:grid-cols-3 gap-8">
        <MainNews news={dummyNews.mainNews} />
        <div className="lg:col-span-1">
          {dummyNews.sideNews.map((news) => (
            <SideNews key={news.id} news={news} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default NewsLayout;
