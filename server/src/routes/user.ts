import { Router } from "express";
import {
  register,
  login,
  updateProfile,
  deleteAccount,
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

router.delete("/delete-account/:userId", verifyToken, deleteAccount);

export default router;
