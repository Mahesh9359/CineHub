import Movie from "../models/Movies.js";

const addMovie = async (req, res) => {
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
  });

  const savedMovie = await newMovie.save();
  res.status(201).json({
    success: true,
    message: "Movie data received",
    data: savedMovie,
  });
};

const getMovies = async (req, res) => {
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
};

const getMovieBySearch = async (req, res) => {
  const { title, year, genre, cast } = req.query;
  const filter = {};

  try {
    if (!title && !year && !genre && !cast) {
      return res.status(400).json({
        success: false,
        message:
          "At least one search parameter (title, year, genre, cast) is required",
      });
    }
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const skip = page * limit;

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (genre) {
      filter.genre = { $regex: genre, $options: "i" };
    }

    if (year) {
      filter.year = Number(year);
    }
    if (cast) {
      filter.cast = { $regex: cast, $options: "i" };
    }

    const count = await Movie.countDocuments(filter);

    const movies = await Movie.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

      const params = new URLSearchParams({
      ...(title && { title }),
      ...(genre && { genre }),
      ...(cast && { cast }),
      ...(year && { year }),
      limit,
    });

    const next =
      skip + limit < count
        ? `${process.env.baseURL}/movies/search?${params.toString()}&page=${page + 1}`
        : null;

    const previous =
      page > 0
        ? `${process.env.baseURL}/movies/search?${params.toString()}&page=${page - 1}`
        : null;

    if (movies.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No movies found matching the search criteria",
      });
    }
    res.json({
      count,
      next,
      previous,
      success: true,
      data: movies,
      message: "Movies fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching movies",
      error: error.message,
    });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  try {
    if (movie) {
      return res.json({
        success: true,
        data: movie,
        message: "Movie fetched successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Movie not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Invalid movie ID",
    });
  }
};



export { addMovie, getMovies, getMovieById, getMovieBySearch };
