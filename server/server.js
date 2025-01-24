import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", () => {
  res.send("Server is Running");
});

app.listen(5000, () => {
  connectDB();
  console.log("Server is running at 5000");
});
