import mongoose from "mongoose";
import User from "../models/User.js";
import Follow from "../models/Follow.js";

// FOLLOW CONTROLLER
export const followUser = async (req, res) => {
  const followerId = req.user._id;
  const { followeeId } = req.body;

  if (String(followerId) === String(followeeId)) {
    return res.status(400).json({ message: "Can't follow yourself" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await Follow.create([{ follower: followerId, followee: followeeId }], {
      session,
    });

    await User.updateOne(
      { _id: followerId },
      { $inc: { followingCount: 1 } },
      { session }
    );

    await User.updateOne(
      { _id: followeeId },
      { $inc: { followerCount: 1 } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.json({ success: true });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    if (err.code === 11000) {
      return res.status(409).json({ message: "Already following" });
    }

    return res.status(500).json({ message: "Server error" });
  }
};

// UNFOLLOW
export const unfollowUser = async (req, res) => {
  const followerId = req.user._id;
  const { followeeId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const del = await Follow.findOneAndDelete({
      follower: followerId,
      followee: followeeId,
    }).session(session);

    if (!del) {
      return res.status(404).json({ message: "Follow relation not found" });
    }

    await User.updateOne(
      { _id: followerId },
      { $inc: { followingCount: -1 } },
      { session }
    );

    await User.updateOne(
      { _id: followeeId },
      { $inc: { followerCount: -1 } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.json({ success: true });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Server error" });
  }
};

// FOLLOWERS LIST
export const getFollowers = async (req, res) => {
  const { userId } = req.params;
  const { limit = 20, before } = req.query;

  const q = { followee: userId };
  if (before) q.createdAt = { $lt: new Date(before) };

  const docs = await Follow.find(q)
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .populate("follower", "username name profileImage");

  res.json({ data: docs });
};

// FOLLOWING LIST
export const getFollowing = async (req, res) => {
  const { userId } = req.params;
  const { limit = 20, before } = req.query;

  const q = { follower: userId };
  if (before) q.createdAt = { $lt: new Date(before) };

  const docs = await Follow.find(q)
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .populate("followee", "username name profileImage");

  res.json({ data: docs });
};

// CHECK IF FOLLOWING
export const isFollowing = async (req, res) => {
  const followerId = req.user._id;
  const { targetId } = req.params;

  const rel = await Follow.findOne({
    follower: followerId,
    followee: targetId,
  });

  res.json({ isFollowing: !!rel });
};
