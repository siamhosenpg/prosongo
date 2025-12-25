import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStory,
  deleteStory,
  getAllStories,
  getStoriesByUser,
  getStoryById,
} from "@/lib/storys/storyData";

import { StoryType } from "@/types/storyType";

// ================================
// Query Keys (Professional way)
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
    onError: (err) => {
      console.error("Create Story Error:", err);
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

      // single story cache remove
      queryClient.removeQueries({
        queryKey: storyQueryKeys.story(storyId),
      });
    },
    onError: (err) => {
      console.error("Delete Story Error:", err);
    },
  });
};

// ================================
// Get All Stories (Public Feed)
// ================================

export const useStories = () => {
  return useQuery<StoryType[]>({
    queryKey: storyQueryKeys.all,
    queryFn: async () => {
      const res = await getAllStories();
      return res.stories;
    },
    staleTime: 1000 * 60, // 1 min cache
  });
};

// ================================
// Get Stories By User
// ================================

export const useStoriesByUser = (userId?: string) => {
  return useQuery<StoryType[]>({
    queryKey: userId ? storyQueryKeys.userStories(userId) : [],
    queryFn: async () => {
      if (!userId) return [];
      const res = await getStoriesByUser(userId);
      return res.stories;
    },
    enabled: !!userId,
  });
};

// ================================
// Get Single Story By ID
// ================================

export const useStoryById = (storyId?: string) => {
  return useQuery<StoryType>({
    queryKey: storyId ? storyQueryKeys.story(storyId) : [],
    queryFn: async () => {
      if (!storyId) throw new Error("Story ID is required");
      return await getStoryById(storyId);
    },
    enabled: !!storyId,
  });
};
