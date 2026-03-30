"use client";

import {
  useMutation,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getPostsByUserId,
  getFeedPosts,
  sharePost,
  getPostCountByUser,
  PostCountResponse,
} from "@/lib/post/feedPosts";
import { useAuth } from "@/hook/useAuth";
import { PostTypes } from "@/types/postType";

// ----------------------------
// TypeScript types
// ----------------------------
interface CreatePostData {
  data: FormData;
}

interface SharePostData {
  parentPost: string;
  caption?: string;
  privacy?: "public" | "friends" | "private";
}

interface UpdatePostData {
  postId: string;
  updatedData: Partial<PostTypes>;
  postUserId: string;
}

interface DeletePostData {
  postId: string;
  postUserId: string;
}

interface FetchPostsResponse {
  posts: PostTypes[];
  nextCursor: string | null;
}

// ============================================================
// QUERY HOOKS — আলাদা আলাদা hook, usePost-এর বাইরে
// Rules of Hooks মানে: hook কখনো function-এর ভেতরে
// nested function হিসেবে call করা যাবে না
// ============================================================

// Feed — Infinite Scroll (Suspense-compatible)
export const useFeedPost = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery<FetchPostsResponse, Error>({
      queryKey: ["feedPosts"],
      queryFn: ({ pageParam }) => getFeedPosts(pageParam as null, 10),
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: null, // React Query v5-এ required
      staleTime: 1000 * 60 * 2,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
};

// Profile Post — Infinite Scroll (Suspense-compatible)
export const useProfilePost = (userid: string) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery<FetchPostsResponse, Error>({
      queryKey: ["feedPosts", userid],
      queryFn: ({ pageParam }) =>
        getPostsByUserId(userid, pageParam as null, 10),
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: null,
      staleTime: 1000 * 60 * 2,
    });

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage };
};

// Single Post (Suspense-compatible)
export const useSinglePost = (postId: string) => {
  const { data } = useSuspenseQuery({
    queryKey: ["posts", postId],
    queryFn: () => getSinglePost(postId),
    staleTime: 1000 * 60 * 2,
  });

  return { data };
};

// Post Count — Suspense লাগবে না, simple query
export const useUserPostCount = (userid?: string) =>
  useQuery<PostCountResponse, Error>({
    queryKey: ["post-count", userid],
    queryFn: () => {
      if (!userid) throw new Error("UserId is required");
      return getPostCountByUser(userid);
    },
    enabled: !!userid,
    staleTime: 1000 * 60,
  });

// ============================================================
// usePost — শুধু mutations থাকবে এখানে
// ============================================================
export const usePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const currentUserId = user?.user?._id;

  // Create Post
  const createPostMutation = useMutation({
    mutationFn: async ({ data }: CreatePostData) => {
      if (!currentUserId) throw new Error("Unauthorized: Login required");
      return createPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });

  // Share Post
  const sharePostMutation = useMutation({
    mutationFn: async (data: SharePostData) => {
      if (!currentUserId) throw new Error("Unauthorized: Login required");
      return sharePost(data);
    },
    onSuccess: (newPost: PostTypes) => {
      queryClient.setQueryData<{ pages: PostTypes[][]; pageParams: any[] }>(
        ["feedPosts"],
        (old: any) => {
          if (!old) return { pages: [[newPost]], pageParams: [undefined] };
          const updatedPages = [...old.pages];
          updatedPages[0] = [newPost, ...updatedPages[0]];
          return { ...old, pages: updatedPages };
        },
      );
    },
  });

  // Update Post
  const updatePostMutation = useMutation({
    mutationFn: async ({ postId, updatedData, postUserId }: UpdatePostData) => {
      if (currentUserId !== postUserId) throw new Error("Unauthorized");
      return updatePost(postId, updatedData);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["feedPosts"] }),
  });

  // Delete Post
  const deletePostMutation = useMutation({
    mutationFn: async ({ postId, postUserId }: DeletePostData) => {
      if (!postId) throw new Error("Post ID missing");
      if (currentUserId !== postUserId) throw new Error("Unauthorized");
      return deletePost(postId);
    },
    onSuccess: (_, variables) => {
      // Main feed থেকে সরাও
      queryClient.setQueryData(["feedPosts"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.filter(
              (post: PostTypes) => post._id !== variables.postId,
            ),
          })),
        };
      });

      // Profile feed থেকে সরাও
      queryClient.setQueryData(
        ["feedPosts", variables.postUserId],
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              posts: page.posts.filter(
                (post: PostTypes) => post._id !== variables.postId,
              ),
            })),
          };
        },
      );
    },
  });

  return {
    createPost: (
      data: FormData,
      options?: { onSuccess?: () => void; onError?: (err: any) => void },
    ) => createPostMutation.mutate({ data }, options),
    createPostLoading: createPostMutation.isPending,

    sharePost: (
      data: SharePostData,
      options?: { onSuccess?: () => void; onError?: (err: any) => void },
    ) => sharePostMutation.mutate(data, options),
    sharePostLoading: sharePostMutation.isPending,

    updatePost: updatePostMutation.mutate,
    updatePostLoading: updatePostMutation.isPending,

    deletePost: deletePostMutation.mutate,
    deletePostLoading: deletePostMutation.isPending,
  };
};
