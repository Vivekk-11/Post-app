import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(3000, () => {
  console.log("Server is listening!");
});

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => console.log(`Error: ${err}`));
