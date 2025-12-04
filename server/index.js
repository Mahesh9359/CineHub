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

app.get("/movies", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const skip = page * limit;

    const count = await Movie.countDocuments();

    const movies = await Movie.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // next page link
    const next =
      skip + limit < count
        ? `https://cine-hub-api.onrender.com/movies?page=${page + 1}`
        : null;

    // previous page link
    const previous =
      page > 0
        ? `https://cine-hub-api.onrender.com/movies?page=${page - 1}`
        : null;

    res.json({
      count,
      next,
      previous,
      data: movies,
      message: "Movies fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movies",
      error: error.message,
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
