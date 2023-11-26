import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts, getUserPosts, getTagPosts } from "../api/feed";

export const useInfinite = (userEmail?: string, tag?: string) => {
  return useInfiniteQuery({
    queryKey: userEmail
      ? ["userPosts", userEmail]
      : tag
      ? ["taggedPosts", tag]
      : ["posts"],

    queryFn: ({ pageParam = 0 }) => {
      if (userEmail) {
        return getUserPosts(userEmail, { page: pageParam, size: 10 });
      } else if (tag) {
        return getTagPosts(tag, { page: pageParam, size: 10 });
      } else {
        return getPosts({ page: pageParam, size: 10 });
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.last) return undefined;
      return allPages.length;
    },
    retry: 2,
  });
};
