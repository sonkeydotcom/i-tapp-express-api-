import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  institution: {
    type: String,
  },
  matricNumber: {
    type: String,
  },
  course: {
    type: String,
  },
  phone: {
    type: String,
  },
  coverLetter: {
    type: String,
  },
  state: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
