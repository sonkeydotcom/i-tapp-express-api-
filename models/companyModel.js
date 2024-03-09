import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const companySchema = mongoose.Schema({
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
  rcNumber: {
    type: String,
  },
  founded: {
    type: String,
  },
  location: {
    type: String,
  },
  industry: {
    type: String,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  duration: {
    type: String,
  },
  capacity: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

companySchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

companySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Company = mongoose.model("Company", companySchema);

export default Company;
