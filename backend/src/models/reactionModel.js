import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Faster filtering by user
    },

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true, // Faster filtering by post
    },

    reaction: {
      type: String,
      enum: ["like", "love", "haha", "wow", "sad", "angry", "care"],
      required: true,
    },
  },
  {
    timestamps: true, // 🔥 Auto-add createdAt & updatedAt
    versionKey: false,
  }
);

// 🔥 Prevent same user reacting twice on same post
reactionSchema.index({ userId: 1, postId: 1 }, { unique: true });

// 🔥 Fast reaction counting per post + type
reactionSchema.index({ postId: 1, reaction: 1 });

export default mongoose.model("Reaction", reactionSchema);
