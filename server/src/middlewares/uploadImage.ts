import { RequestHandler, Request } from "express";
import { Readable } from "node:stream";
import multer, { FileFilterCallback } from "multer";
const storage = multer.memoryStorage();

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

const imageFileFilter = (
  req: Request,
  file: CustomFile,
  cb: FileFilterCallback
) => {
  cb(null, true);
};

export const uploadImage = multer({ storage, fileFilter: imageFileFilter });

export const validateRegisterProfileImage: RequestHandler = (
  req,
  res,
  next
) => {
  if (!req?.file) return next();
  if (
    req.file.mimetype === "image/jpg" ||
    req.file.mimetype === "image/jpeg" ||
    req.file.mimetype === "image/png"
  ) {
    if (req?.file?.size > 5000000)
      return res.status(403).json("Image size is too large.");
    next();
  } else return res.status(403).json("Please provide a valid image!");
};

export const validateUpdateProfileImage: RequestHandler = (req, res, next) => {
  if (!req?.file) return res.status(400).json("Please provide an image!");
  if (
    req.file.mimetype === "image/jpg" ||
    req.file.mimetype === "image/jpeg" ||
    req.file.mimetype === "image/png"
  ) {
    if (req?.file?.size > 5000000)
      return res.status(403).json("Image size is too large.");
    next();
  } else return res.status(403).json("Please provide a valid image!");
};

export const validatePostImage: RequestHandler = (req, res, next) => {
  if (!req?.file) return res.status(400).json("Please provide an image!");
  if (
    req.file.mimetype === "image/jpg" ||
    req.file.mimetype === "image/jpeg" ||
    req.file.mimetype === "image/png"
  ) {
    if (req?.file?.size > 5000000)
      return res.status(403).json("Image size is too large.");
    next();
  } else return res.status(403).json("Please provide a valid image!");
};
