import express from "express";
import {
  createStory,
  deleteStory,
  getStoriesByUser,
  getAllStories,
  getStoryById,
} from "../controllers/storyController.js";

import { protect } from "../middleware/auth.js";
import storyUpload from "../middleware/story/storyUpload.js";
import { validateStorySize } from "../middleware/story/validateStorySize.js";

const router = express.Router();

// -------------------
// Create Story (UPLOAD)
// -------------------
router.post(
  "/",
  protect,
  storyUpload.single("story"), // field name = story
  validateStorySize,
  createStory
);

// -------------------
// Delete Story
// -------------------
router.delete("/:storyId", protect, deleteStory);

// -------------------
// Get stories by user
// -------------------
router.get("/user/:userId", getStoriesByUser);

// -------------------
// Get all stories
// -------------------
router.get("/", getAllStories);

// -------------------
// Get story by ID
// -------------------
router.get("/:id", getStoryById);

export default router;
