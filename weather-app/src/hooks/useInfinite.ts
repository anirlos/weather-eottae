import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../api/feed";

export const useInfinite = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => getPosts({ page: pageParam, size: 10 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last) return undefined;
      return allPages.length;
    },
    retry: 2,
  });
};
