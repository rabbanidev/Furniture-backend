import { check, validationResult } from "express-validator";

const validateSignupRequest = [
  check("fullName").notEmpty().withMessage("Fullname is required"),
  check("email").notEmpty().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6, max: 16 })
    .withMessage(
      "Password must be at least 8 characters and less than 16 characters"
    ),
];

const validateSigninRequest = [
  check("email").notEmpty().withMessage("Email is required"),
  check("password")
    .isLength({ min: 6, max: 16 })
    .withMessage(
      "Password must be at least 8 characters and less than 16 characters"
    ),
];

const isValidateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({
      message: errors.array()[0].msg,
    });
  }
  next();
};

export { validateSignupRequest, validateSigninRequest, isValidateRequest };
