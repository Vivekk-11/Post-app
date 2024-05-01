import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET_KEY!,
  secure: true,
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server is listening!");
});

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => console.log(`Error: ${err}`));
