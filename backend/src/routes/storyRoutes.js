import express from "express";
import {
  createStory,
  deleteStory,
  getStoriesByUser,
  getAllStories,
  getStoryById,
} from "../controllers/storyController.js";
import { protect } from "../middleware/auth.js"; // JWT middleware

const router = express.Router();

// Create a new story
router.post("/", protect, createStory);

// Delete a story
router.delete("/:storyId", protect, deleteStory);

// Get all stories of a user
router.get("/user/:userId", getStoriesByUser);

// Get all stories (public stories or friends stories)
router.get("/", getAllStories);

// Get story by ID
router.get("/:id", getStoryById);

export default router;
