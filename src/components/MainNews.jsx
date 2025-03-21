import { formatDate } from "../utils/dateFormatterNews";

const MainNews = ({ news }) => (
  <div className="lg:col-span-2 mb-8 lg:mb-0">
    <div className="relative w-full h-64 lg:h-96 mb-4 rounded-lg overflow-hidden">
      <img
        src={news.media[0]?.mediaUrl}
        alt={news.title}
        className="w-full h-full object-cover"
        onLoad={(e) => {
          // Jika gambar persegi (rasio mendekati 1:1)
          if (
            e.target.naturalWidth / e.target.naturalHeight > 0.9 &&
            e.target.naturalWidth / e.target.naturalHeight < 1.1
          ) {
            e.target.classList.remove("object-cover");
            e.target.classList.add("object-contain", "bg-gray-100");
          }
        }}
      />
    </div>
    <time className="text-gray-500 text-sm">{formatDate(news.createdAt)}</time>
    <h2 className="text-2xl font-bold mt-2 mb-3">{news.title}</h2>
    <p className="text-gray-600 line-clamp-3">{news.description}</p>
  </div>
);

export default MainNews;
