import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Movie from "./models/Movies.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);

    if (conn) {
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running smoothly!",
  });
});

app.post("/movies", async (req, res) => {
  const {
    title,
    description,
    images,
    director,
    year,
    genre,
    cast,
    rating,
    duration,
  } = req.body;

  const newMovie = new Movie({
    title,
    description,
    images,
    director,
    year,
    genre,
    cast,
    rating,
    duration,
    createdAt: new Date(),
  })

  const savedMovie = await newMovie.save();
  res.json({
    success: true,
    message: "Movie data received",
    data: req.body,
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
