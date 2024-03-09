import express from "express";
const router = express.Router();
import {
  authCompany,
  registerCompany,
  logoutCompany,
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/companyController.js";

import { protect } from "../middleware/authMiddleware.js";

router.post("/companies/auth", authCompany);
router.post("/companies/register", registerCompany);
router.post("/companies/logout", logoutCompany);
router.get("/companies/profile", protect, getCompanyProfile);
router.put("/companies/profile-update", protect, updateCompanyProfile);

export default router;
