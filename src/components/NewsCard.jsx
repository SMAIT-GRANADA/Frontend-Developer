import NotFoundImage from "../assets/404.jpg";

const NewsCard = ({ news, isMain = false }) => {
  const hasMedia = news?.media?.[0]?.mediaUrl;

  return (
    <div
      className={`${
        isMain ? "col-span-full mb-8" : "mb-6"
      } transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] rounded-lg overflow-hidden`}
    >
      <div className="relative overflow-hidden">
        <img
          src={hasMedia || NotFoundImage}
          alt={news?.title || "Berita tidak tersedia"}
          className={`w-full ${
            isMain ? "h-64 sm:h-80 md:h-96" : "h-40 sm:h-48"
          } object-cover rounded-lg mb-4 ${
            hasMedia ? "transition-transform duration-500 hover:scale-105" : ""
          }`}
          onError={(e) => {
            e.target.src = NotFoundImage;
          }}
          loading="lazy"
        />
      </div>
      <div className="px-1">
        <time className="text-gray-500 text-xs sm:text-sm">
          {news?.createdAt
            ? new Date(news.createdAt).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Tanggal tidak tersedia"}
        </time>
        <h2
          className={`${
            isMain ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
          } font-bold mt-2 mb-2 sm:mb-3 line-clamp-2`}
        >
          {news?.title || "Berita tidak tersedia"}
        </h2>
        <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
          {news?.description || "Konten berita tidak tersedia saat ini"}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
