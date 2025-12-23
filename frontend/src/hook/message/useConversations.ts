// src/hooks/useConversations.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getConversations,
  getOrCreateConversation,
  getConversationById,
} from "@/lib/message/conversation";
import { ConversationType } from "@/types/message/Conversation";

export const useConversations = () => {
  return useQuery<ConversationType[], Error>({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation<ConversationType, Error, string>({
    mutationFn: getOrCreateConversation,

    onSuccess: (conversation) => {
      queryClient.setQueryData<ConversationType[]>(
        ["conversations"],
        (old = []) => {
          const exists = old.find((c) => c._id === conversation._id);
          return exists ? old : [conversation, ...old];
        }
      );
    },
  });
};

export const useConversation = (conversationId: string) => {
  return useQuery<ConversationType, Error>({
    queryKey: ["conversation", conversationId],
    queryFn: () => getConversationById(conversationId),
    enabled: !!conversationId,
    staleTime: 60 * 1000,
  });
};
