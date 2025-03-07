import NotFoundImage from "../assets/404.jpg";

const NewsCard = ({ news, isMain = false }) => (
  <div className={`${isMain ? "col-span-full mb-8" : "mb-6"}`}>
    <img
      src={news?.media?.[0]?.mediaUrl || NotFoundImage}
      alt={news?.title || "Berita tidak tersedia"}
      className={`w-full ${
        isMain ? "h-96" : "h-48"
      } object-cover rounded-lg mb-4`}
      onError={(e) => {
        e.target.src = NotFoundImage;
      }}
    />
    <time className="text-gray-500 text-sm">
      {news?.createdAt
        ? new Date(news.createdAt).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Tanggal tidak tersedia"}
    </time>
    <h2 className={`${isMain ? "text-2xl" : "text-lg"} font-bold mt-2 mb-3`}>
      {news?.title || "Berita tidak tersedia"}
    </h2>
    <p className="text-gray-600 line-clamp-2">
      {news?.description || "Konten berita tidak tersedia saat ini"}
    </p>
  </div>
);

export default NewsCard;
