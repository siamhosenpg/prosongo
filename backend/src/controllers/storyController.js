import Story from "../models/storyModel.js";

// -------------------
// Create Story
// -------------------
export const createStory = async (req, res) => {
  try {
    const { media, textOverlay, expiresAt } = req.body;
    const userId = req.user.id; // ✔ authenticated user ID

    if (!media?.url || !media?.type) {
      return res
        .status(400)
        .json({ message: "Media URL and type are required" });
    }

    if (!["image", "video"].includes(media.type)) {
      return res
        .status(400)
        .json({ message: "Media type must be image or video" });
    }

    const story = await Story.create({
      userId,
      media,
      textOverlay,
      expiresAt,
    });

    res.status(201).json({ success: true, story });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------
// Delete Story
// -------------------
export const deleteStory = async (req, res) => {
  try {
    const { storyId } = req.params;

    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    // ✔ Only owner can delete
    if (story.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await story.deleteOne(); // ✔ recommended instead of remove()
    res.json({ success: true, message: "Story deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------
// Get Stories By User
// -------------------
export const getStoriesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const stories = await Story.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, count: stories.length, stories });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------
// Get ALL Stories (Public Feed)
// -------------------
export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate("userId", "name userid profileImage")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: stories.length,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------
// Get Story By ID
// -------------------
export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate(
      "userId",
      "name userid profileImage"
    );

    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    return res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
