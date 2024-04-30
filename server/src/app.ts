import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.listen(3000, () => {
  console.log("Server is listening!");
});

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => console.log(`Error: ${err}`));
