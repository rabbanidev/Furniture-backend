import express from "express";
import {
  getUserAddress,
  getUserById,
  getUserList,
  signin,
  signup,
  updatePassword,
  updateUser,
  userAddress,
  userInfo,
} from "../controllers/auth.js";
import { isAdminRole, isLoggedIn } from "../middleware/userCheck.js";
import {
  isValidateRequest,
  validateSigninRequest,
  validateSignupRequest,
} from "../validators/auth.js";

const router = express.Router();

router.post("/auth/signup", validateSignupRequest, isValidateRequest, signup);
router.post("/auth/signin", validateSigninRequest, isValidateRequest, signin);
router.get("/userinfo", isLoggedIn, userInfo);
router.get("/user/:id", isLoggedIn, getUserById);
router.get("/user-list", isLoggedIn, isAdminRole, getUserList);
router.get("/user-address-book", isLoggedIn, getUserAddress);
router.post("/user/update-password", isLoggedIn, updatePassword);

router.post("/user/address-book/add", isLoggedIn, userAddress);
router.post("/user/edit/:id", isLoggedIn, isAdminRole, updateUser);

export default router;
