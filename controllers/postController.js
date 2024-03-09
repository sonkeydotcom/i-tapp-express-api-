import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc    Get all posts
// @route   GET /api/v1/posts/all
// @access  Public

const getPosts = (req, res) => {
  res.json({ message: "post " }).status(200);
};

// @desc    Create new post
// @route   POST /api/v1/posts
// @access  Public

/** @param :  {
  "title": "example title",
  "duration": "6 months",
  "indsutry": "example industry",
  "description": "example description",
  "location": [
    {"city": "example city",},
  {"state": "example state"},
  {"address": "example address"}],
  "created_at": "2021-09-01T00:00:00.000+00:00",
  "updated_at": "2021-09-01T00:00:00.000+00:00",
  "company": "example company",
 }
 */

const createPost = (req, res) => {
  res.json({ message: "post created" }).status(201);
};

export { getPosts };
