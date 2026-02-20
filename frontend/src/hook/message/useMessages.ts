// src/hooks/useMessages.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages } from "@/lib/message/message";
import { MessageType } from "@/types/message/Message";
import { getSocket } from "@/lib/socket";
import { useEffect } from "react";

interface SendMessageInput {
  text?: string;
  media?: string;
}

export const useMessages = (conversationId: string) => {
  const queryClient = useQueryClient();
  const socket = getSocket();

  // 1️⃣ Fetch messages (initial load via REST)
  const messagesQuery = useQuery<MessageType[], Error>({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: false,
  });

  // 2️⃣ Send message via socket
  const sendMessageMutation = useMutation<MessageType, Error, SendMessageInput>(
    {
      mutationFn: ({ text, media }) => {
        return new Promise<MessageType>((resolve, reject) => {
          socket.emit(
            "send_message",
            { conversationId, text, media },
            (response: any) => {
              if (response?.error) return reject(response.error);
              resolve(response);
            },
          );
        });
      },
      onSuccess: (message) => {
        queryClient.setQueryData<MessageType[]>(
          ["messages", conversationId],
          (old = []) => [...old, message],
        );
      },
    },
  );

  // 3️⃣ Listen for incoming messages
  useEffect(() => {
    const handleReceiveMessage = (message: MessageType) => {
      // ⚡ Only add message if it belongs to this conversation
      if (message.conversationId !== conversationId) return;

      queryClient.setQueryData<MessageType[]>(
        ["messages", conversationId],
        (old = []) => [...old, message],
      );
    };

    // ⚡ Attach listener only once per hook instance
    socket.on("receive_message", handleReceiveMessage);

    // Cleanup
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [conversationId, queryClient, socket]); // stable deps

  return { messagesQuery, sendMessageMutation };
};
