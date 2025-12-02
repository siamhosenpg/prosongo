import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usercontrol.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getUsers); // ✅ সব ইউজার দেখাবে
router.get("/:userid", getUserById); // ✅ নির্দিষ্ট ইউজার দেখাবে (id দিয়ে)
router.post("/", createUser); // ✅ নতুন ইউজার তৈরি করবে
router.put("/:userid", protect, updateUser); // ✅ ইউজার তথ্য আপডেট করবে
router.delete("/:userid", protect, deleteUser); // ✅ ইউজার ডিলিট করবে

export default router;
