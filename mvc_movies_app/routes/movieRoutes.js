import {
  createMovie,
  readMovies,
  readMovieById,
  updateMovieById,
  deleteMovieById,
} from "../controllers/movieController.js";
import express from "express";

const router = express.Router();
router.post("/", createMovie);
//Read
router.get("/", readMovies);
//Read by ID
router.get("/:id", readMovieById);
//Update by ID
router.put("/:id", updateMovieById);
//Delete by ID
router.delete("/:id", deleteMovieById);

export default router;