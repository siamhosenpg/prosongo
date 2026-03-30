import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createStory,
  deleteStory,
  getAllStories,
  getStoriesByUser,
  getStoryById,
} from "@/lib/storys/storyData";

import { StoryType } from "@/types/storyType";

// ================================
// Query Keys
// ================================
export const storyQueryKeys = {
  all: ["stories"] as const,
  myStories: ["myStories"] as const,
  userStories: (userId: string) => ["stories", "user", userId] as const,
  story: (storyId: string) => ["stories", storyId] as const,
};

// ================================
// Create Story
// ================================
export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storyQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: storyQueryKeys.myStories });
    },
    onError: (error) => {
      console.error("Create Story Error:", error);
    },
  });
};

// ================================
// Delete Story
// ================================
export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStory,
    onSuccess: (_, storyId) => {
      queryClient.invalidateQueries({ queryKey: storyQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: storyQueryKeys.myStories });
      queryClient.removeQueries({ queryKey: storyQueryKeys.story(storyId) });
    },
    onError: (err) => {
      console.error("Delete Story Error:", err);
    },
  });
};

// ================================
// Get All Stories — Suspense-compatible
// ================================
export const useStories = () => {
  return useSuspenseQuery<StoryType[]>({
    queryKey: storyQueryKeys.all,
    queryFn: async () => {
      const res = await getAllStories();
      return res.stories;
    },
    staleTime: 1000 * 60,
  });
};

// ================================
// Get Stories By User — Suspense-compatible
// ================================
export const useStoriesByUser = (userId: string) => {
  return useSuspenseQuery<StoryType[]>({
    queryKey: storyQueryKeys.userStories(userId),
    queryFn: async () => {
      const res = await getStoriesByUser(userId);
      return res.stories;
    },
    staleTime: 1000 * 60,
  });
};

// ================================
// Get Single Story By ID — Suspense-compatible
// ================================
export const useStoryById = (storyId: string) => {
  return useSuspenseQuery<StoryType>({
    queryKey: storyQueryKeys.story(storyId),
    queryFn: () => getStoryById(storyId),
    staleTime: 1000 * 60,
  });
};
