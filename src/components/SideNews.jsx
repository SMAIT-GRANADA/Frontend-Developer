import { formatDate } from "../utils/dateFormatterNews";

const SideNews = ({ news, isLast }) => (
  <div className={`relative pb-6 mb-6 ${isLast ? "last:pb-0 last:mb-0" : ""}`}>
    <div className="flex flex-col md:flex-row gap-4">
      <img
        src={news.media[0]?.mediaUrl}
        alt={news.title}
        className="w-full md:w-32 h-48 md:h-24 object-cover rounded-lg"
      />
      <div>
        <time className="text-gray-500 text-sm">
          {formatDate(news.createdAt)}
        </time>
        <h3 className="font-semibold mt-1 mb-2">{news.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{news.description}</p>
      </div>
    </div>
    {!isLast && (
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#DEE2DD]">
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-1 h-1 bg-[#DEE2DD] rounded-full"></div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1 h-1 bg-[#DEE2DD] rounded-full"></div>
      </div>
    )}
  </div>
);

export default SideNews;
