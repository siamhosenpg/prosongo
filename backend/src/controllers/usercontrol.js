import mongoose from "mongoose";
import UserSchema from "../models/usermodel.js";

const User = mongoose.model("User", UserSchema);
/**
 * ✅ Get all users
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password বাদ
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * ✅ Get a single user by userid (NOT _id)
 */
export const getUserById = async (req, res) => {
  try {
    const userid = Number(req.params.userid);

    const user = await User.findOne({ userid }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * ✅ Create new user
 */
export const createUser = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });

    if (exists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const newUser = new User(req.body);
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        ...savedUser._doc,
        password: undefined, // password hide
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Cannot create user", error: err.message });
  }
};

/**
 * ✅ Update user data
 */
export const updateUser = async (req, res) => {
  try {
    const userid = Number(req.params.userid);

    const updatedUser = await User.findOneAndUpdate({ userid }, req.body, {
      new: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Cannot update user", error: err.message });
  }
};

/**
 * ✅ Delete user
 */
export const deleteUser = async (req, res) => {
  try {
    const userid = Number(req.params.userid);

    const deletedUser = await User.findOneAndDelete({ userid });

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Cannot delete user", error: err.message });
  }
};

/**
 * ✅ Get a single user by username (NOT userid)
 */
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find user by username
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
