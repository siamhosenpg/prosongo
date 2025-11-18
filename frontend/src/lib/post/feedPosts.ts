// src/lib/api/postApi.ts

import axiosInstance from "../axios";
import { PostTypes } from "@/types/postType";

// Get all feed posts
export const getFeedPosts = async (): Promise<PostTypes[]> => {
  try {
    const response = await axiosInstance.get<PostTypes[]>("/posts");
    return response.data;
  } catch (err: any) {
    console.error("Error fetching posts:", err.message);
    return [];
  }
};

// Get single post
export const getSinglePost = async (
  postid: number
): Promise<PostTypes | null> => {
  try {
    const response = await axiosInstance.get<PostTypes>(`/posts/${postid}`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching single post:", err.message);
    return null;
  }
};

// Create new post
export const createPost = async (
  postData: Partial<PostTypes>
): Promise<PostTypes | null> => {
  try {
    const response = await axiosInstance.post<PostTypes>("/posts", postData);
    return response.data;
  } catch (err: any) {
    console.error("Error creating post:", err.message);
    return null;
  }
};

// Update post
export const updatePost = async (
  postId: string,
  updatedData: Partial<PostTypes>
): Promise<PostTypes | null> => {
  try {
    const response = await axiosInstance.put<PostTypes>(
      `/posts/${postId}`,
      updatedData
    );
    return response.data;
  } catch (err: any) {
    console.error("Error updating post:", err.message);
    return null;
  }
};

// Delete post
export const deletePost = async (postId: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/posts/${postId}`);
    return true;
  } catch (err: any) {
    console.error("Error deleting post:", err.message);
    return false;
  }
};
