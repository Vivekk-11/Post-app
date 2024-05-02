import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import streamifier from "streamifier";
import mongoose from "mongoose";
import Post from "../models/Post";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export const register: RequestHandler = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(423).json(error.array()[0].msg);
    }

    const { name, email, password } = req.body;
    const isUserWithName: IUser | null = await User.findOne({ name });
    if (isUserWithName)
      return res.status(401).json("User with that username already exists!");

    const isUserWithEmail: IUser | null = await User.findOne({ email });
    if (isUserWithEmail)
      return res.status(401).json("User with that email already exists!");

    const hashedPassword = await bcrypt.hash(password, 10);

    //TODO: Organize the below code 👇
    if (req.file) {
      const bufferStream = streamifier.createReadStream(req.file.buffer);
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        bufferStream,
        async (error, result) => {
          if (error) {
            return res
              .status(500)
              .json("Something went wrong, please try again!");
          }
          if (!result?.secure_url)
            return res
              .status(500)
              .json("Something went wrong, please try again!");
          const user = await User.create({
            name,
            email,
            password: hashedPassword,
            picture: result.secure_url,
          });
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
          return res.json({
            userId: user._id,
            email: user.email,
            name: user.name,
            picture: user.picture,
            token,
          });
        }
      );
      uploadStream.write(req.file.buffer);
      uploadStream.end();
    } else {
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
      return res.json({
        userId: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        token,
      });
    }
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });
    if (!isUser)
      return res.status(401).json("Invalid email or password. Try again!");
    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword)
      return res.status(401).json("Invalid email or password. Try again!");

    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET!);

    return res.json({
      id: isUser._id,
      email: isUser.email,
      name: isUser.name,
      picture: isUser.picture,
      token,
    });
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

export const updateProfile: RequestHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json("Please provide an image!");
    }

    //@ts-ignore
    const user: IUser | null = await User.findById(req?.user?.id);
    if (!user) return res.status(401).json("Unauthorized!");
    const bufferStream = streamifier.createReadStream(req.file.buffer);
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      bufferStream,
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json("Something went wrong, please try again!");
        }
        if (!result?.secure_url)
          return res
            .status(500)
            .json("Something went wrong, please try again!");
        user.picture = result.secure_url;
        await user.save();

        return res.json(result.secure_url);
      }
    );
    uploadStream.write(req.file.buffer);
    uploadStream.end();
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

export const deleteAccount: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    //@ts-ignore
    if (userId.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json("You are not authorized to delete this account!");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json("Something went wrong, please try again later!");
    }

    await User.deleteOne({ _id: new mongoose.Types.ObjectId(userId) });
    await Post.deleteMany({ creator: new mongoose.Types.ObjectId(userId) });

    return res.json("You successfully deleted your account!");
  } catch (error) {
    res.status(500).json("Something went wrong, please try again!");
  }
};

export const resetPassword: RequestHandler = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(423).json(error.array()[0].msg);
    }
    //@ts-ignore
    const user = await User.findById(req.user.id);

    if (!user) return res.status(401).json("Unauthorized!");

    const { password } = req.body;
    const isSamePass = await bcrypt.compare(password, user.password);
    if (isSamePass) return res.status(401).json("Please enter a new password!");
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json("You successfully changed your password!");
  } catch (error) {
    res.status(500).json("Something went wrong, please try again!");
  }
};

export const resetForgotPassword: RequestHandler = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(423).json(error.array()[0].msg);
    }
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("Enter your email address!");
    }
    if (
      user?.passwordResetTokenExpire &&
      user.passwordResetTokenExpire > new Date()
    ) {
      return res.status(400).json("We've already sent you an email!");
    }
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetUrl = `If you requested to reset your password, reset it now within 10 minutes, otherwise the token will expire. <a href=${process.env.FRONTEND_RESET_PASSWORD_LINK}/${token}>Reset Password</a>`;
    const msg = {
      from: process.env.EMAIL_ID,
      to: user.email,
      subject: "Password Reset!",
      html: resetUrl,
    };

    //@ts-ignore
    await sgMail.send(msg);
    return res.json("Check your mail box!");
  } catch (error) {
    res.status(500).json("Something went wrong, please try again!");
  }
};

export const resetPasswordFromEmail: RequestHandler = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(423).json(error.array()[0].msg);
    }
    const { token, password } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({ passwordResetToken: hashedToken });
    if (!user) {
      return res.status(401).json("Something went wrong!");
    }
    if (
      user?.passwordResetTokenExpire &&
      user.passwordResetTokenExpire < new Date()
    ) {
      return res.status(401).json("Token is expired, try again later.");
    }

    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;
    await user.save();
    return res.json("Password changed successfully!");
  } catch (error) {
    res.status(500).json("Something went wrong, please try again!");
  }
};
