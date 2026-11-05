
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

app.use(express.json()); // for parsing JSON
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// const MONGO_URL = "mongodb://admin:admin123@localhost:27017/?authSource=admin";
const MONGO_URL = process.env.MONGO_URL;
const dbName = "library_db";

const client = new MongoClient(MONGO_URL);

let db;

// client
//   .connect()
//   .then(() => {
//     console.log("Connected to MongoDB");
//     db = client.db(dbName);
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//     process.exit(1);
//   });

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    db = client.db(dbName);

    const PORT = process.env.PORT || 7000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });


// CRUD operations library database

// Create a new book
// POST /api/v1/books (title, author)

app.post("/api/v1/books", (req, res) => {
  const book = req.body;

  db.collection("books")
    .insertOne(book)
    .then((result) => {
      res.status(201).json({
        message: "Book created successfully",
        data: {
          _id: result.insertedId,
          ...book
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Book creation failed"
      });
    });
});


// Get all books
// Get books by category

app.get("/api/v1/books/category", (req, res) => {
  const { category } = req.query;

  const query = category ? { category: category } : {};

  db.collection("books")
    .find(query)
    .toArray()
    .then((books) => {
      res.status(200).json({
        message: "Books retrieved successfully",
        data: books
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve books"
      });
    });
});


// Get book by ID

app.get("/api/v1/books/:id", (req, res) => {
  const { id } = req.params;

  db.collection("books")
    .findOne({ _id: new ObjectId(id) })
    .then((book) => {
      if (!book) {
        const err = new Error("Book not found");
        err.status = 404;
        throw err;
      }

      res.status(200).json({
        message: "Book retrieved successfully",
        data: book
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to retrieve book"
      });
    });
});


// Update book

app.put("/api/v1/books/:id", (req, res) => {
  const { id } = req.params;
  const updateBook = req.body;

  db.collection("books")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: updateBook }
    )
    .then((result) => {
      if (result.matchedCount === 0) {
        const err = new Error("Book not found");
        err.status = 404;
        throw err;
      }

      res.status(200).json({
        message: "Book updated successfully",
        data: {
          _id: id,
          ...updateBook
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to update book"
      });
    });
});


// Delete book

app.delete("/api/v1/books/:id", (req, res) => {
  const { id } = req.params;

  db.collection("books")
    .deleteOne({ _id: new ObjectId(id) })
    .then((result) => {
      if (result.deletedCount === 0) {
        const err = new Error("Book not found");
        err.status = 404;
        throw err;
      }

      res.status(200).json({
        message: "Book deleted successfully",
        data: {
          _id: id
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete book"
      });
    });
});


// 404 middleware

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


// Error handling middleware

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    message
  });
});


// const PORT = 7000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const PORT = process.env.PORT || 7000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server is running on port ${PORT}`);
// });
