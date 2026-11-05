import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(express.json());

// Establish connection with MongoDB
connectDB(MONGO_URI);

// Movie routes
app.use("/api/v1/movies", movieRoutes);

// 404
app.use((req, res) => {
  res.status(404);
  res.json({ message: "Route Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});