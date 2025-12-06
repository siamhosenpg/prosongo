// lib/storyApi.ts

import axiosInstance from "../axios";
import { StoryType } from "@/types/storyType";

// -------------------
// Create Story
// -------------------
export const createStory = async (
  data: Partial<StoryType>
): Promise<{ success: boolean; story: StoryType }> => {
  const res = await axiosInstance.post("/stories", data);
  return res.data;
};

// -------------------
// Delete Story
// -------------------
export const deleteStory = async (
  storyId: string
): Promise<{ success: boolean; message: string }> => {
  const res = await axiosInstance.delete(`/stories${storyId}`);
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
