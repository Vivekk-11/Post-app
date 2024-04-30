import { Router } from "express";
import { register } from "../controllers/user";
import { body } from "express-validator";
import {
  uploadImage,
  validateRegisterProfileImage,
} from "../middlewares/uploadImage";

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

export default router;
