import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";

/**
 * ✅ Get all users
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * ✅ Get single user by userid
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
 * ✅ Create new user (with bcrypt hashing)
 */
export const createUser = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body.email });

    if (exists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPass,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        ...savedUser._doc,
        password: undefined,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Cannot create user", error: err.message });
  }
};

///** ✅ Update user
// */
export const updateUser = async (req, res) => {
  try {
    const userid = Number(req.params.userid); // numeric userid
    const loggedInUserId = req.user.id; // MongoDB _id (string)

    // Step 1: First find user by numeric userid
    const user = await User.findOne({ userid });
    console.log("FOUND USER:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Compare user._id with loggedIn user id
    if (user._id.toString() !== loggedInUserId) {
      return res.status(403).json({
        message: "You can only edit your own profile",
      });
    }

    // Allowed fields
    const allowedFields = [
      "name",
      "username",
      "bio",
      "profileImage",
      "coverImage",
      "aboutText",
      "gender",
      "work",
      "location",
      "education",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    // Password handle
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(req.body.password, salt);
    }

    // Step 3: Update with MongoDB _id
    const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
      new: true,
    }).select("-password");

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
 * ✅ Get user by username
 */
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username)
      return res.status(400).json({ message: "Username is required" });

    const user = await User.findOne({ username }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
