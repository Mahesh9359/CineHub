import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {
  addMovie,
  getMovies,
  getMovieById,
  getMovieBySearch,
  updateRating,
  updateMovie,
  deleteMovie
} from "./controllers/movies.js";

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

app.post("/movies", addMovie);

app.get("/movies", getMovies);

app.get("/movies/search", getMovieBySearch);

app.get("/movies/:id", getMovieById);

app.patch("/movies/:id/rating", updateRating);

app.put("/movies/:id", updateMovie);

app.delete("/movies/:id", deleteMovie);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
