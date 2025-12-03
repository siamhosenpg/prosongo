// hooks/useReactions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrUpdateReaction,
  deleteReaction,
  getReactionsByPost,
} from "@/lib/api/reactionApi";

export const useReactions = (postId: string) => {
  const queryClient = useQueryClient();

  // ✅ get all reactions (object style)
  const { data, isLoading } = useQuery({
    queryKey: ["reactions", postId],
    queryFn: () => getReactionsByPost(postId),
  });

  // ✅ create or update reaction
  const reactMutation = useMutation({
    mutationFn: createOrUpdateReaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["reactions", postId] }),
  });

  // ✅ delete reaction
  const deleteMutation = useMutation({
    mutationFn: deleteReaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["reactions", postId] }),
  });

  return { data, isLoading, reactMutation, deleteMutation };
};
