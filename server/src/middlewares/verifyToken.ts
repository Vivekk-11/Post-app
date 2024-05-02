import { RequestHandler, Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
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

const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json("Authentication Failed!");
    token = token.split(" ")[1];
    if (!token) return res.status(401).json("Authentication Failed!");
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      async (err: any, tokenData: any) => {
        if (err) return res.status(401).json("Authentication Failed!");
        req.user = { ...tokenData };
        next();
      }
    );
  } catch (error: any) {
    return res
      .status(error.code || 500)
      .json(error.message || "Something went wrong, please try again!");
  }
};

export default verifyToken;
