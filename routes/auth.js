import express from "express";
import { signin, signup, userInfo } from "../controllers/auth.js";
import { isLoggedIn } from "../middleware/userCheck.js";
import {
  isValidateRequest,
  validateSigninRequest,
  validateSignupRequest,
} from "../validators/auth.js";

const router = express.Router();

router.post("/auth/signup", validateSignupRequest, isValidateRequest, signup);
router.post("/auth/signin", validateSigninRequest, isValidateRequest, signin);

router.get("/userinfo", isLoggedIn, userInfo);

export default router;
