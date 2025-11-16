import express from "express";
import * as followController from "../controllers/followController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Routes
router.post("/follow", auth, followController.followUser);
router.post("/unfollow", auth, followController.unfollowUser);

router.get("/followers/:userId", followController.getFollowers);
router.get("/following/:userId", followController.getFollowing);

router.get("/isFollowing/:targetId", auth, followController.isFollowing);

export default router;
