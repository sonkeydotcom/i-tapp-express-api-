import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Company from "../models/companyModel.js";

//@desc     Auth company
//@route    POST /api/v1/auth
//@access   Public

const authCompany = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const company = await Company.findOne({ email });

  if (company && (await company.matchPassword(password))) {
    generateToken(res, company._id);
    res.status(201).json({
      _id: company._id,
      name: company.name,
      email: company.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc     Register company
//@route    POST /api/v1/register
//@access   Public
const registerCompany = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const companyExists = await Company.findOne({ email });
  if (companyExists) {
    res.status(400);
    throw new Error("Company already exists");
  }

  const company = await Company.create({ name, email, password });

  if (company) {
    generateToken(res, company._id);
    res.status(201).json({
      _id: company._id,
      name: company.name,
      email: company.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid company data");
  }
});

//@desc     Logout company ]
//@route    POST /api/v1/logout
//@access   Public
const logoutCompany = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.json({ message: " Logged out" }).status(200);
});

//@desc     Get company profile
//@route    GET /api/v1/profile
//@access   Private
const getCompanyProfile = asyncHandler(async (req, res) => {
  const company = {
    _id: req.company._id,
    name: req.company.name,
    email: req.company.email,
  };
  res.json({ company }).status(200);
});

//@desc     Update company profile
//@route    PUT /api/v1/profile-update
//@access   Private
const updateCompanyProfile = asyncHandler(async (req, res) => {
  const company = await Company.findById(req.company._id);

  if (company) {
    company.name = req.body.name || company.name;
    company.email = req.body.email || company.email;

    if (req.body.password) {
      company.password = req.body.password;
    }

    const updatedCompany = await Company.save();
    generateToken(res, updatedCompany._id);
    res.status(201).json({
      _id: updatedCompany._id,
      name: updatedCompany.name,
      email: updatedCompany.email,
    });
  } else {
    res.status(404);
    throw new Error("company not found");
  }
  res.json({ message: "Hello world" }).status(200).end();
});

export {
  authCompany,
  registerCompany,
  logoutCompany,
  getCompanyProfile,
  updateCompanyProfile,
};
