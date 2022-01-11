import express from "express";
import { signin, signup } from "../controllers/auth.js";
import { isAdminRole, isLoggedIn } from "../middleware/userCheck.js";
import {
  isValidateRequest,
  validateSigninRequest,
  validateSignupRequest,
} from "../validators/auth.js";

const router = express.Router();

router.post("/auth/signup", validateSignupRequest, isValidateRequest, signup);
router.post("/auth/signin", validateSigninRequest, isValidateRequest, signin);

router.get("/dashboard", isLoggedIn, isAdminRole, (req, res) => {
  console.log(req.user);
  res.send("Admin access dashboard");
});

export default router;
