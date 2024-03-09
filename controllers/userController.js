import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import otpGenerator from "otp-generator";
import User from "../models/userModel.js";
import ExtendedUserInfo from "../models/extendedModel.js";

import Post from "../models/postModel.js";

//@desc     Generate OTP
//@route    POST /api/v1/register
//@access   Public

const generateOTP = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    res.status(400);
    throw new Error(" All fields are required");
  }

  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
  res.status(201).json({ otp });
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  if (user.otp === otp) {
    user.otp = null;
    user.isVerified = true;
    await user.save();
    res.status(201).json({ message: "OTP verified" });
  } else {
    res.status(400);
    throw new Error("Invalid OTP");
  }
});

//@desc     Auth user
//@route    POST /api/v1/auth
//@access   Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc     Register user
//@route    POST /api/v1/register
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc     Logout user ]
//@route    POST /api/v1/logout
//@access   Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.json({ message: " Logged out" }).status(200);
});

//@desc     Get user profile
//@route    GET /api/v1/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);

    throw new Error("User not found");
  }

  res.json({ user }).status(200);
});

//@desc     Update user profile
//@route    PUT /api/v1/profile-update
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    generateToken(res, updatedUser._id);
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const extendedProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    fullName,
    institution,
    matricNumber,
    course,
    phone,
    coverLetter,
    state,
    start,
    end,
  } = req.body;

  if (
    !fullName ||
    !institution ||
    !matricNumber ||
    !course ||
    !phone ||
    !coverLetter ||
    !state ||
    !start ||
    !end
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

  try {
    let user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Update user document with extended information
    user.fullName = fullName;
    user.institution = institution;
    user.matricNumber = matricNumber;
    user.course = course;
    user.phone = phone;
    user.coverLetter = coverLetter;
    user.state = state;
    user.start = start;
    user.end = end;

    await user.save();

    // Generate token and return user data
    generateToken(res, user._id);
    res
      .json({
        user,
      })
      .status(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export {
  generateOTP,
  verifyOTP,
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  extendedProfile,
};
