import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  followee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  createdAt: { type: Date, default: Date.now, index: true },
});

// Prevent duplicate follows
FollowSchema.index({ follower: 1, followee: 1 }, { unique: true });

const Follow = mongoose.model("Follow", FollowSchema);
export default Follow;
