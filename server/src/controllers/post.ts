import { RequestHandler, Request, Response } from "express";
import { validationResult } from "express-validator";
import Post from "../models/Post";
import { v2 } from "cloudinary";
import { createReadStream } from "streamifier";
import { ObjectId } from "mongoose";
import { Readable } from "node:stream";

interface CustomFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  stream: Readable; // Include stream property
  destination: string; // Include destination property
  filename: string; // Include filename property
  path: string;
}

interface CustomRequest extends Request {
  file?: CustomFile;
  user?: {
    id: ObjectId;
  };
}

export const createPost = async (req: CustomRequest, res: Response) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(423).json(error.array()[0].msg);
    }
    if (!req?.file) return res.status(400).json("Please provide an image!");

    const { title, description } = req.body;
    //@ts-ignore
    const userId = req.user.id;

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
        const createdPost = await Post.create({
          title,
          description,
          image: result.secure_url,
          creator: userId,
        });

        const post = await Post.findById(createdPost._id).populate(
          "creator",
          "name picture email"
        );

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
      .limit(+limit)
      .populate("creator", "name email picture");

    const documentCount = await Post.countDocuments();
    return res.json({ posts, postsCount: documentCount });
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};

export const searchPosts: RequestHandler = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) return res.status(403).json("Invalid request.");
    const posts = await Post.find({
      title: { $regex: title, $options: "i" },
    }).populate("creator", "name email picture");
    return res.json(posts);
  } catch (error) {
    return res.status(500).json("Something went wrong, please try again!");
  }
};
