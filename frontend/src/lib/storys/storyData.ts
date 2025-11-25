// lib/storyApi.ts

import axiosInstance from "../axios";
import { StoryType } from "@/types/storyType";

// -------------------
// Create Story
// -------------------
export const createStory = async (
  data: Partial<StoryType>
): Promise<StoryType> => {
  try {
    const res = await axiosInstance.post("/story/create", data);
    return res.data as StoryType;
  } catch (error: any) {
    throw error.response?.data || { message: "Error creating story" };
  }
};

// -------------------
// Edit Story
// -------------------
export const editStory = async (
  storyId: string,
  data: Partial<StoryType>
): Promise<StoryType> => {
  try {
    const res = await axiosInstance.put(`/story/edit/${storyId}`, data);
    return res.data as StoryType;
  } catch (error: any) {
    throw error.response?.data || { message: "Error editing story" };
  }
};

// -------------------
// Delete Story
// -------------------
export const deleteStory = async (
  storyId: string
): Promise<{ message: string }> => {
  try {
    const res = await axiosInstance.delete(`/story/delete/${storyId}`);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Error deleting story" };
  }
};

// -------------------
// Get Stories by User
// -------------------
export const getStoriesByUser = async (
  userId: string
): Promise<StoryType[]> => {
  try {
    const res = await axiosInstance.get(`/story/user/${userId}`);
    return res.data as StoryType[];
  } catch (error: any) {
    throw error.response?.data || { message: "Error fetching user stories" };
  }
};

// -------------------
// Get All Stories (Public Feed)
// -------------------
export const getAllStories = async (): Promise<StoryType[]> => {
  try {
    const res = await axiosInstance.get("/stories");
    return res.data as StoryType[];
  } catch (error: any) {
    throw error.response?.data || { message: "Error fetching all stories" };
  }
};

// -------------------
// Get Story by ID
// -------------------
// Get Story by ID (MongoDB _id)
// -------------------
export const getStoryById = async (storiesid: string): Promise<StoryType> => {
  try {
    const res = await axiosInstance.get(`/stories/${storiesid}`);
    return res.data as StoryType;
  } catch (error: any) {
    throw error.response?.data || { message: "Error fetching story by ID" };
  }
};
