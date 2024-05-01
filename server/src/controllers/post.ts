import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import Post from "../models/Post";
import { v2 } from "cloudinary";
import { createReadStream } from "streamifier";

export const createPost: RequestHandler = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(423).json(error.array()[0].msg);
    }
    if (!req?.file) return res.status(400).json("Please provide an image!");

    const { title, description } = req.body;
    //@ts-ignore
    const userId = req.user.id;
    //@ts-ignore

    const bufferStream = createReadStream(req.file.buffer);
    const uploadStream = v2.uploader.upload_stream(
      bufferStream,
      async (error: any, result: any) => {
        if (error) {
          return res
            .status(500)
            .json("Something went wrong, please try again!");
        }
        if (!result?.secure_url)
          return res
            .status(500)
            .json("Something went wrong, please try again!");
        const post = await Post.create({
          title,
          description,
          image: result.secure_url,
          creator: userId,
        });

        return res.json(post);
      }
    );
    uploadStream.write(req.file.buffer);
    uploadStream.end();
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

export const getPosts: RequestHandler = async (req, res) => {
  try {
    const { pageNo, limit } = req.query;
    if (!pageNo || !limit) return res.status(400).json("Something went wrong!");
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(+pageNo * +limit)
      .limit(+limit);
    return res.json(posts);
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};
