import { Router } from "express";
import {
  register,
  login,
  updateProfile,
  deleteAccount,
  resetPassword,
  resetForgotPassword,
  resetPasswordFromEmail,
} from "../controllers/user";
import { body } from "express-validator";
import {
  uploadImage,
  validateRegisterProfileImage,
  validateUpdateProfileImage,
} from "../middlewares/uploadImage";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.post(
  "/register",
  uploadImage.single("profileImage"),
  validateRegisterProfileImage,
  [
    body("name")
      .trim()
      .isString()
      .isLength({ min: 3, max: 30 })
      .withMessage("Name must be between 3 to 30 characters."),
    body("email").trim().isEmail().withMessage("Enter a valid email address."),
    body("password")
      .trim()
      .isString()
      .isLength({ min: 8, max: 30 })
      .withMessage("Password must contain at least 8 characters."),
  ],
  register
);

router.post(
  "/login",
  body("email").trim().isEmail().withMessage("Enter a valid email address."),
  login
);

router.put(
  "/update-profile",
  verifyToken,
  uploadImage.single("profileImage"),
  validateUpdateProfileImage,
  updateProfile
);

router.put(
  "/reset-password",
  verifyToken,
  body("password")
    .trim()
    .isString()
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must contain at least 8 characters."),
  resetPassword
);

router.post(
  "/reset-password",
  body("email").trim().isEmail().withMessage("Enter a valid email address."),
  resetForgotPassword
);

router.post(
  "/reset-password-from-email",
  [
    body("password")
      .trim()
      .isString()
      .isLength({ min: 8, max: 30 })
      .withMessage("Password must contain at least 8 characters."),
    body("token")
      .trim()
      .isString()
      .isLength({ min: 1 })
      .withMessage("Something went wrong!"),
  ],
  resetPasswordFromEmail
);

router.delete("/delete-account/:userId", verifyToken, deleteAccount);

export default router;
