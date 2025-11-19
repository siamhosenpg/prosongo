import express from "express";
import {
  createStory,
  editStory,
  deleteStory,
  getStoriesByUser,
  getAllStories,
} from "../controllers/storyController.js";
import { protect } from "../middleware/auth.js"; // JWT middleware

const router = express.Router();

// Create a new story
router.post("/", protect, createStory);

// Edit a story
router.patch("/:storyId", protect, editStory);

// Delete a story
router.delete("/:storyId", protect, deleteStory);

// Get all stories of a user
router.get("/user/:userId", protect, getStoriesByUser);

// Get all stories (public stories or friends stories)
router.get("/", getAllStories);

export default router;
