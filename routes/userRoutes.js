import express from "express";
import {
  getUserInfo,
  getUserPosts,
  getUserComments,
  getUserLikedPosts,
  updateUser,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:username", getUserInfo);
router.get("/:username/posts", getUserPosts);
router.get("/:username/comments", getUserComments);
router.get("/:username/likes", getUserLikedPosts);
router.put("/update", authenticateToken, updateUser);

export default router;
