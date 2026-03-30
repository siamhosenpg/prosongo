import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getVideoPostsApi, getVideoPostsByUserApi } from "@/lib/post/videosapi";

// ================================
// Types
// ================================
interface VideoPost {
  _id: string;
  // বাকি fields তোমার PostTypes থেকে নাও
}

interface VideoPostsResponse {
  posts: VideoPost[];
  nextCursor: string | null;
  hasMore: boolean;
}

// ================================
// All Video Posts
// ================================
export const useVideoPosts = () => {
  return useSuspenseInfiniteQuery<VideoPostsResponse, Error>({
    queryKey: ["video-posts"],
    queryFn: ({ pageParam }) =>
      getVideoPostsApi({ pageParam: (pageParam as string | null) ?? null }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage?.hasMore ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60,
  });
};

// ================================
// Video Posts By User
// ================================
export const useVideoPostsByUser = (userid: string) => {
  return useSuspenseInfiniteQuery<VideoPostsResponse, Error>({
    queryKey: ["video-posts", userid],
    queryFn: ({ pageParam }) =>
      getVideoPostsByUserApi({
        pageParam: pageParam as string | null,
        userid,
      }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60,
  });
};
