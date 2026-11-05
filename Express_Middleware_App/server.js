// Express - Middleware - App

import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";

const app = express();

// Application-level middleware

// Third-party middleware
app.use(cors());
app.use(morgan("dev"));

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom middleware
const logger = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        const log = `${req.method} ${req.url} 
        ${res.statusCode} - ${duration} ms\n`;

        fs.appendFile("server.log", log, (err) => {
            if (err) {
                console.log(err, "failed to write logs");
            }
        });
    });

    next();
};

app.use(logger);

// Validation middleware
const validate = (req, res, next) => {
    if (!req.body) {
        const err = new Error("Patient details are missing");
        err.statusCode = 400;
        throw err;
    }

    const { name, gender, ward } = req.body;

    if (!name || !gender || !ward) {
        const err = new Error("Patient details are missing");
        err.statusCode = 400;
        throw err;
    }

    next();
};

// POST
// Create patient
// POST http://localhost:6500/api/v1/patients
// Payload: { name, gender, ward }

app.post("/api/v1/patients", validate, (req, res) => {
    res.status(201).send("Patient added successfully");
});

// GET
// Read all patients
// GET http://localhost:6500/api/v1/patients

app.get("/api/v1/patients", (req, res) => {
    const { ward } = req.query;

    if (ward) {
        res.status(200).send(
            `Patients of ${ward} fetched successfully`
        );
    } else {
        res.status(200).send("All patients fetched successfully");
    }
});

// GET
// Read patient by ID
// GET http://localhost:6500/api/v1/patients/:id

app.get("/api/v1/patients/:id", (req, res) => {
    const { id } = req.params;

    res.status(200).send(
        `Patient with ID ${id} fetched successfully`
    );
});

// PUT
// Update patient
// PUT http://localhost:6500/api/v1/patients/:id
// Payload: { name, gender, ward }

app.put("/api/v1/patients/:id", (req, res) => {
    const { id } = req.params;

    res.status(200).send(
        `Patient with ID ${id} updated successfully`
    );
});

// DELETE
// Delete patient
// DELETE http://localhost:6500/api/v1/patients/:id

app.delete("/api/v1/patients/:id", (req, res) => {
    const { id } = req.params;

    res.status(200).send(
        `Patient with ID ${id} deleted successfully`
    );
});

// 404 middleware

app.use((req, res) => {
    res.status(404).send("Resource not found");
});

// Error-handling middleware

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).send(message);
});

// Start server

const PORT = 6500;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});