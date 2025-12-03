// lib/api/reactionApi.ts
import axiosInstance from "@/lib/axios";

export const createOrUpdateReaction = async ({
  postId,
  reaction,
}: {
  postId: string;
  reaction: string;
}) => {
  const res = await axiosInstance.post(
    "/reactions",
    { postId, reaction },
    { withCredentials: true }
  );
  return res.data;
};

export const deleteReaction = async (postId: string) => {
  const res = await axiosInstance.delete(`/reactions/${postId}`, {
    withCredentials: true,
  });
  return res.data;
};

export const getReactionsByPost = async (postId: string) => {
  const res = await axiosInstance.get(`/reactions/post/${postId}`);
  return res.data;
};
