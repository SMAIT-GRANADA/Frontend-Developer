import { useQuery } from "@tanstack/react-query";
import { getNews } from "../services/news.service";

const newsKeys = {
  all: ["news"],
  list: (params) => [...newsKeys.all, "list", params],
};

export const useNewsQuery = (params = { limit: 5, page: 1 }) => {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: () => getNews(params),
  });
};
