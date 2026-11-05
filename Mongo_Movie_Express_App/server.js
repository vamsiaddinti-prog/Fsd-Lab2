
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(express.json());

// Establishing connecting with mongodb
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Problem while connecting MongoDB", err);
    });

// 1. Schema and Model creation
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: String,
    category: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true }
});

const Movie = mongoose.model("movie", movieSchema);

//CRUD
// 2) Create
app.post("/api/v1/movies", (req, res) => {
    const newMovie = new Movie(req.body);

    newMovie.save()
        .then((result) => {
            res.status(201).json({
                message: "Movie created successfully",
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Problem while creating movie"
            });
        });
});

// 3) Read

app.get("/", (req, res) => {
    res.send("Mongo Movie Express App is running successfully!");
});  //newly added

app.get("/api/v1/movies", (req, res) => {
    const { category } = req.query;

    const filter = category ? { category } : {};

    Movie.find(filter)
        .then((result) => {
            res.status(200).json({
                message: "Movies retrieved successfully",
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Problem while retrieving movies"
            });
        });
});

// 4) Read by ID
app.get("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;

    Movie.findById(id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: "Movie not found" })
            }

            res.status(200).json({
                message: "Movie retrieved successfully",
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Problem while retrieving movie"
            });
        });
});

// 5) Update by ID
app.put("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    Movie.findByIdAndUpdate(id, updateData, { new: true })
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: "Movie not found" })
            }

            res.status(200).json({
                message: "Movie updated successfully",
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Problem while updating movie"
            });
        });
});

// 6) Delete by ID
app.delete("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;

    Movie.findByIdAndDelete(id)
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: "Movie not found" })
            }

            res.status(200).json({
                message: "Movie deleted successfully",
                data: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Problem while deleting movie"
            });
        });
});

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message || "Internal server error"
    });
});

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




