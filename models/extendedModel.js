import mongoose from "mongoose";

const { Schema } = mongoose;

const extendedSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    matricNumber: {
      type: String,
      required: true,
    },
    course: {
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
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ExtendedUserInfo = mongoose.model("ExtendedUserInfo", extendedSchema);

export default ExtendedUserInfo;
