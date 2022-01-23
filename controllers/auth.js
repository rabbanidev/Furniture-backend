import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/generateToken.js";
import Auth from "../models/auth.js";

const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  const exitUser = await Auth.findOne({ email });
  if (exitUser) {
    res.status(401).send({ message: "Already Register User" });
  } else {
    const newUser = await Auth.create({ email, password, fullName });
    if (newUser) {
      res.status(201).send({
        message: "User created successfully",
        token: generateToken(newUser._id),
        userInfo: {
          id: newUser._id,
          userName: newUser.userName,
          email: newUser.email,
          avater: newUser.avater,
          role: newUser.role,
        },
      });
    } else {
      res.status(401).send({ message: "Something wrong" });
    }
  }
});

const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email });
  if (user) {
    const matchPassword = await bcrypt.compare(password, user.password);
    if (matchPassword) {
      res.status(200).send({
        token: generateToken(user._id),
        userInfo: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          avater: user.avater,
          role: user.role,
        },
      });
    } else {
      res.status(401);
      throw new Error("Invalid Password");
    }
  } else {
    res.status(401);
    throw new Error("Invalid email address");
  }
});

const userInfo = asyncHandler(async (req, res) => {
  try {
    const userInfo = await Auth.findById(req.user.id).select(
      "fullName email avater role"
    );
    res.status(200).send(userInfo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export { signup, signin, userInfo };
