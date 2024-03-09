import asyncHandler from "express-async-handler";
import express from "express";
import User from "../models/userModel.js";
import Application from "../models/applicationModel.js";

const router = express.Router();

router.get("/q", async (req, res) => {
  const { email } = req.query;
  const applications = await Application.find({ email });
  res.json({ applications }).status(200);
});

// GET /api/v1/applications
router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const applications = await Application.find();
      res.status(200).json({ applications });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);

// POST /api/v1/applications
router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      fullName,
      institution,
      course,
      phone,
      coverLetter,
      location,
    } = req.body;

    // Check if all required fields are provided
    if (
      !name ||
      !email ||
      !fullName ||
      !institution ||
      !course ||
      !phone ||
      !coverLetter ||
      !location
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user by ID
    const user = await User.findById(req.user._id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if an application already exists for the user
    const existingApplication = await Application.findOne({
      userId: req.user._id,
    });
    if (existingApplication) {
      // If application exists, update it
      existingApplication.name = name;
      existingApplication.email = email;
      existingApplication.fullName = fullName;
      existingApplication.institution = institution;
      existingApplication.course = course;
      existingApplication.phone = phone;
      existingApplication.coverLetter = coverLetter;
      existingApplication.location = location;

      await existingApplication.save();

      return res.status(200).json({ application: existingApplication });
    } else {
      // If application doesn't exist, create a new one
      const newApplication = await Application.create({
        userId: req.user._id,
        name,
        email,
        fullName,
        institution,
        course,
        phone,
        coverLetter,
        location,
      });

      return res.status(201).json({ application: newApplication });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
