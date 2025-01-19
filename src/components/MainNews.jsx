const MainNews = ({ news }) => (
  <div className="lg:col-span-2 mb-8 lg:mb-0">
    <img
      src={news.media[0]?.mediaUrl}
      alt={news.title}
      className="w-full h-64 lg:h-96 object-cover rounded-lg mb-4"
    />
    <time className="text-gray-500 text-sm">
      {new Date(news.createdAt).toLocaleDateString()}
    </time>
    <h2 className="text-2xl font-bold mt-2 mb-3">{news.title}</h2>
    <p className="text-gray-600">{news.description}</p>
  </div>
);

export default MainNews;
