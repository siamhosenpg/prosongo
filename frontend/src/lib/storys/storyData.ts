// lib/storyApi.ts

import axiosInstance from "../axios";
import { StoryType } from "@/types/storyType";

// -------------------
// Create Story (File Upload)
// -------------------
export const createStory = async (data: {
  file: File; // image or video
  textOverlay?: string;
  expiresAt?: string;
}): Promise<{ success: boolean; story: StoryType }> => {
  const formData = new FormData();

  formData.append("story", data.file); // MUST match backend: single("story")

  if (data.textOverlay) {
    formData.append("textOverlay", data.textOverlay);
  }

  if (data.expiresAt) {
    formData.append("expiresAt", data.expiresAt);
  }

  const res = await axiosInstance.post("/stories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
// -------------------
// Delete Story
// -------------------
export const deleteStory = async (
  storyId: string
): Promise<{ success: boolean; message: string }> => {
  const res = await axiosInstance.delete(`/stories/${storyId}`);
  return res.data;
};

// -------------------
// Get Stories by User
// -------------------
export const getStoriesByUser = async (
  userId: string
): Promise<{ success: boolean; stories: StoryType[] }> => {
  const res = await axiosInstance.get(`/stories/user/${userId}`);
  return res.data;
};

// -------------------
// Get All Stories (Public Feed)
// -------------------
export const getAllStories = async (): Promise<{
  success: boolean;
  stories: StoryType[];
}> => {
  const res = await axiosInstance.get("/stories");
  return res.data;
};

// -------------------
// Get Story by ID
// -------------------
export const getStoryById = async (storyId: string): Promise<StoryType> => {
  const res = await axiosInstance.get(`/stories/${storyId}`);
  return res.data;
};
