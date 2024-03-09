import mongoose from "mongoose";

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
