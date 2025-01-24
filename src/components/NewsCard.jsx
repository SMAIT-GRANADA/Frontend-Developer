const NewsCard = ({ news, isMain = false }) => (
  <div className={`${isMain ? "col-span-full mb-8" : "mb-6"}`}>
    <img
      src={news?.media[0]?.mediaUrl}
      alt={news?.title}
      className={`w-full ${
        isMain ? "h-96" : "h-48"
      } object-cover rounded-lg mb-4`}
    />
    <time className="text-gray-500 text-sm">
      {new Date(news?.createdAt).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </time>
    <h2 className={`${isMain ? "text-2xl" : "text-lg"} font-bold mt-2 mb-3`}>
      {news?.title || "Lorem ipsum dolor sit amet"}
    </h2>
    <p className="text-gray-600 line-clamp-2">
      {news?.description || "Lorem ipsum dolor sit amet"}
    </p>
  </div>
);

export default NewsCard;
