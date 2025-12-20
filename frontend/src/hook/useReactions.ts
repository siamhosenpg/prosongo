// hooks/useReactions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReaction,
  updateReaction,
  deleteReaction,
  getReactionsByPost,
  getReactionCount,
} from "@/lib/api/reactionApi";

export const useReactions = (postId: string) => {
  const queryClient = useQueryClient();

  // 🔹 Get all reactions of this post
  const { data, isLoading } = useQuery({
    queryKey: ["reactions", postId],
    queryFn: () => getReactionsByPost(postId),
  });

  // 🔹 Create Reaction
  const createMutation = useMutation({
    mutationFn: createReaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions", postId] });
      queryClient.invalidateQueries({ queryKey: ["reactionCount", postId] });
    },
  });

  // 🔹 Update Reaction
  const updateMutation = useMutation({
    mutationFn: updateReaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions", postId] });
      queryClient.invalidateQueries({ queryKey: ["reactionCount", postId] });
    },
  });

  // 🔹 Delete Reaction
  const deleteMutation = useMutation({
    mutationFn: deleteReaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions", postId] });
      queryClient.invalidateQueries({ queryKey: ["reactionCount", postId] });
    },
  });

  // 🔹 Count Query
  const reactionCountQuery = useQuery({
    queryKey: ["reactionCount", postId],
    queryFn: () => getReactionCount(postId),
  });

  return {
    data,
    isLoading,
    reactionCountQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
