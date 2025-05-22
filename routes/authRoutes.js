import express from "express";
import {
  register,
  login,
  getProfile,
  logout,
  deleteAccount,
} from "../controllers/authController.js";

import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", getProfile);
router.post("/logout", logout);

// 회원 탈퇴 라우트 추가
router.delete("/delete-account", authenticateToken, deleteAccount);

export default router;
