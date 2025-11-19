import Story from "../models/storyModel.js";

// -------------------
// Create Story
// -------------------
export const createStory = async (req, res) => {
  try {
    const { media, textOverlay, expiresAt } = req.body;
    const userId = req.user.id;

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
// Edit Story
// -------------------
export const editStory = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { media, textOverlay, expiresAt } = req.body;

    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ message: "Story not found" });

    if (story.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    if (media) story.media = media;
    if (textOverlay) story.textOverlay = textOverlay;
    if (expiresAt) story.expiresAt = expiresAt;

    await story.save();
    res.json({ success: true, story });
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
    if (!story) return res.status(404).json({ message: "Story not found" });

    if (story.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await story.remove();
    res.json({ success: true, message: "Story deleted" });
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
    // Expired story বাদ দিয়ে শুধু active story দেখাবে
    const now = new Date();

    const stories = await Story.find({
      expiresAt: { $gt: now }, // Only non-expired stories
    })
      .populate("userId", "name userid profileImage") // show user info
      .sort({ createdAt: -1 }); // newest first

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
