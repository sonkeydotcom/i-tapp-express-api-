import express from "express";
const router = express.Router();
import {
  authUser,
  generateOTP,
  verifyOTP,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  extendedProfile,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

router.post("/auth", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.post("/profile", protect, extendedProfile);
router.put("/profile-update", protect, updateUserProfile);
router.post("/generate-otp", generateOTP);
router.post("/verify-otp", verifyOTP);

export default router;
