const SideNews = ({ news }) => (
  <div className="border-b last:border-b-0 pb-6 mb-6 last:pb-0 last:mb-0">
    <div className="flex flex-col md:flex-row gap-4">
      <img
        src={news.image}
        alt={news.title}
        className="w-full md:w-32 h-48 md:h-24 object-cover rounded-lg"
      />
      <div>
        <time className="text-gray-500 text-sm">{news.date}</time>
        <h3 className="font-semibold mt-1 mb-2">{news.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{news.content}</p>
      </div>
    </div>
  </div>
);

export default SideNews;
