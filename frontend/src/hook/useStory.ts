// hooks/useStory.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createStory, deleteStory } from "@/lib/storys/storyData";

export const useCreateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStory,
    onSuccess: () => {
      // Refresh stories
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
    },
    onError: (err: any) => {
      console.error("Create Story Error:", err);
    },
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStory,
    onSuccess: () => {
      // Refresh stories after delete
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      queryClient.invalidateQueries({ queryKey: ["myStories"] });
    },
    onError: (err: any) => {
      console.error("Delete Story Error:", err);
    },
  });
};
