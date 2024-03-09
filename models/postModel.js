import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: [
    {
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
