import NewsCard from "./NewsCard";

const NewsGrid = ({ news, startIndex, endIndex }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {news?.slice(startIndex, endIndex).map((item, index) => (
      <NewsCard key={item?.id || index} news={item} />
    ))}
  </div>
);

export default NewsGrid;
