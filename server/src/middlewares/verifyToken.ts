import { RequestHandler } from "express";

import jwt from "jsonwebtoken";

const verifyToken: RequestHandler = async (req, res, next) => {
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
        //@ts-ignore
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
