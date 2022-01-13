import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Auth from "../models/auth.js";

const isLoggedIn = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Auth.findById(decoded.id);
      const userInfo = { id: user.id, role: user.role };
      req.user = userInfo;
      next();
    } catch (error) {
      res.status(401).send({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).send({ message: "Not authorized, no token" });
  }
});

const isAdminRole = asyncHandler(async (req, res, next) => {
  if (req.user.role === process.env.ROLE) {
    next();
  } else {
    res.status(403).send({ message: "Access deined" });
  }
});

export { isLoggedIn, isAdminRole };
