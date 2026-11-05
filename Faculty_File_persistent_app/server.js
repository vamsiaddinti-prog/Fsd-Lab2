import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());


// Read data from faculty.json
const readData = () => {
    const data = fs.readFileSync(
        "./data/faculty.json",
        "utf-8"
    );

    return JSON.parse(data);
};


// Write data into faculty.json
const writeData = (data) => {
    fs.writeFileSync(
        "./data/faculty.json",
        JSON.stringify(data, null, 2),
        "utf-8"
    );
};


// ==============================
// CRUD OPERATIONS API
// ==============================


// 1. CREATE A NEW FACULTY MEMBER
// POST http://localhost:8000/api/v1/faculty

app.post("/api/v1/faculty", (req, res) => {

    const allFaculty = readData();

    const newFaculty = {
        id: allFaculty.length === 0 ? 1
            : allFaculty[allFaculty.length - 1].id + 1, ...req.body
    };

    allFaculty.push(newFaculty);

    writeData(allFaculty);

    res.status(201).json({
        message: "Faculty member created successfully",
        data: newFaculty
    });
});


// 3. READ A SINGLE FACULTY MEMBER BY ID
// GET http://localhost:8000/api/v1/faculty/:id

app.get("/api/v1/faculty/:id", (req, res) => {

    const allFaculty = readData();

    const facultyId = parseInt(req.params.id);

    const faculty = allFaculty.find(
        (f) => f.id === facultyId
    );

    if (faculty) {

        res.status(200).json({
            message: "Faculty member retrieved successfully",
            data: faculty
        });

    } else {

        return res.status(400).json({
            message: "Faculty member not found"
        });

    }
});

//
// 4. READ FACULTY MEMBERS BY DEPARTMENT
// GET http://localhost:8000/api/v1/faculty?dept=CSE

app.get("/api/v1/faculty", (req, res) => {

    let allFaculty = readData();

    const dept = req.query.dept;

    if (dept) {

        allFaculty = allFaculty.filter(
            (f) => f.dept === dept
        );

    }

    res.status(200).json({
        message: "Faculty members retrieved successfully",
        data: allFaculty
    });
});


// 5. UPDATE A FACULTY MEMBER BY ID
// PUT http://localhost:8000/api/v1/faculty/:id

app.put("/api/v1/faculty/:id", (req, res) => {

    const allFaculty = readData();

    const facultyId = parseInt(req.params.id);

    const facultyIndex = allFaculty.findIndex(
        (f) => f.id === facultyId
    );

    if (facultyIndex !== -1) {

        const updatedFaculty = {
            id: facultyId,
            ...req.body
        };

        allFaculty[facultyIndex] = updatedFaculty;

        writeData(allFaculty);

        res.status(200).json({
            message: "Faculty member updated successfully",
            data: updatedFaculty
        });

    } else {

        return res.status(400).json({
            message: "Faculty member not found"
        });

    }
});


// 6. DELETE A FACULTY MEMBER BY ID
// DELETE http://localhost:8000/api/v1/faculty/:id

app.delete("/api/v1/faculty/:id", (req, res) => {

    const facultyId = parseInt(req.params.id);

    const allFaculty = readData();

    const facultyIndex = allFaculty.findIndex(
        (f) => f.id === facultyId
    );

    if (facultyIndex !== -1) {

        const deletedFaculty = allFaculty.splice(
            facultyIndex,
            1
        )[0];

        writeData(allFaculty);

        res.status(200).json({
            message: "Faculty member deleted successfully",
            data: deletedFaculty
        });

    } else {

        return res.status(400).json({
            message: "Faculty member not found"
        });

    }
});


// ==============================
// START SERVER
// ==============================

const PORT = 8000;

app.listen(PORT, () => {

    console.log(
        `Server is running on http://localhost:${PORT}`
    );

});