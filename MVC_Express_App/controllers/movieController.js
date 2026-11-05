import Movie from "../models/movieModel.js";

// Create
const createMovie = (req, res) => {
  const newMovie = new Movie(req.body);

  newMovie
    .save()
    .then((result) => {
      res
        .status(201)
        .json({
          message: "Movie created successfully",
          data: result,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Problem while creating movie",
          error: err.message,
        });
    });
};

// Read all movies
const readMovies = (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};

  Movie.find(filter)
    .then((result) => {
      res
        .status(200)
        .json({
          message: "Movies retrieved successfully",
          data: result,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Problem while retrieving movies",
          error: err.message,
        });
    });
};

// Read movie by ID
const readMovieById = (req, res) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((result) => {
      if (!result) {
        const error = new Error("Movie not found");
        error.status = 404;
        throw error;
      }

      res
        .status(200)
        .json({
          message: "Movie retrieved successfully",
          data: result,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Problem while retrieving movie",
          error: err.message,
        });
    });
};

// Update movie by ID
const updateMovieById = (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  Movie.findByIdAndUpdate(id, updateData, { new: true })
    .then((result) => {
      if (!result) {
        const error = new Error("Movie not found");
        error.status = 404;
        throw error;
      }

      res
        .status(200)
        .json({
          message: "Movie updated successfully",
          data: result,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Problem while updating movie",
          error: err.message,
        });
    });
};

// Delete movie by ID
const deleteMovieById = (req, res) => {
  const { id } = req.params;

  Movie.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        const error = new Error("Movie not found");
        error.status = 404;
        throw error;
      }

      res
        .status(200)
        .json({
          message: "Movie deleted successfully",
          data: result,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "Problem while deleting movie",
          error: err.message,
        });
    });
};

export {
  createMovie,
  readMovieById,
  readMovies,
  updateMovieById,
  deleteMovieById,
};