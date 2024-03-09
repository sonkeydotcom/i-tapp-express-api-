import asyncHandler from "express-async-handler";
import Application from "../models/applicationModel.js";
import User from "../models/userModel.js";

// @desc    Create new application
// @route   POST /api/v1/applications
// @access  Public

/**  @param :  {
    "jobId": "example jobId",
    "userId": "example userId",
    "fullName": "example fullName",
    "institution": "example institution",
    "course": "example course",
    "email": "example email",
    "phone": "example phone",
    "coverLetter": "example coverLetter",
    "location": "example location",
    "duration": "example duration",
    "status": "example status",
}
*/
const createApplication = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const { phone, coverLetter, location, start, end } = req.body;

  try {
    res.json({ user }).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export { createApplication };
