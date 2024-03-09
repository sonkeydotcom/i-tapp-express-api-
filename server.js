import express from "express";
import multer from "multer";
import { notFound, errorHandler } from "./middleware/errorMiddlware.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import cookieParser from "cookie-parser";
import postRoute from "./routes/postRoute.js";
import Post from "./models/postModel.js";
import applicationRoute from "./routes/applicationRoute.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/users", userRoute);
app.use("/api/v1", companyRoute);
app.use("api/v1/posts", postRoute);
app.use("/api/v1/applications", applicationRoute);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "I-Tapp" }).status(200).end();
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  console.log(posts.length);
  res.json({ posts }).status(200);
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ message: "All fields are required" });
  }

  const post = await new Post({
    title,
    content,
  }).save();
  res.json({ post }).status(200);
});

connectDB(
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
);
