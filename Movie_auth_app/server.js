import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

connectDB(mongoURI, dbName);
app.use(express.json());

// Routes for todo API
app.use("/api/v1/todos", todoRoutes);
// Routes for user API
app.use("/api/v1/users", userRoutes);
//Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});