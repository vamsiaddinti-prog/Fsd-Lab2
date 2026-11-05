import http from "http";
const students = [
    { id: 1, name: "Ravi", age: 20 },
    { id: 2, name: "Raju", age: 22 },
    { id: 3, name: "Devi", age: 20 }
];
const server = http.createServer((req, res) => {
    // Create a new student - POST
    if (req.method === "POST" && req.url === "/students") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const newStudent = JSON.parse(body);
            students.push(newStudent);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                message: "Student created successfully",
                data: newStudent
            }));
        });
    }
    // Read all students - GET
    else if (req.method === "GET" && req.url === "/students") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({
            message: "All students fetched successfully",
            data: students
        }));
    }
    // Read a student by ID - GET
    else if ( req.method === "GET" &&req.url.startsWith("/students/")) {
        const studentId = parseInt(req.url.split("/")[2]);
        const student = students.find((stu) => stu.id === studentId);
        if (student) {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                message: "Student details fetched successfully",
                data: student
            }));
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                message: "Student not found"
            }));
        }
    }
    // Update a student - PUT
    else if (req.method === "PUT" && req.url.startsWith("/students/")   ) {
        const studentId = parseInt(req.url.split("/")[2]);
        let body = "";
        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            const updateData = JSON.parse(body);
            const studentIndex = students.findIndex((stu) => stu.id === studentId);
            if (studentIndex !== -1) {
                students[studentIndex] = {...students[studentIndex],...updateData};
                res.writeHead(200, {"Content-Type": "application/json"});
                res.end(JSON.stringify({
                    message: "Student updated successfully",
                    data: students[studentIndex]
                }));
            } else {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({
                    message: "Student not found"
                }));
            }
        });

    }
    // Delete a student - DELETE
    else if (req.method === "DELETE" && req.url.startsWith("/students/")) {
        const studentId = parseInt(req.url.split("/")[2]);
        const studentIndex = students.findIndex((stu) => stu.id === studentId);
        if (studentIndex !== -1) {
            const deletedStudent =students.splice(studentIndex, 1);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                message: "Student deleted successfully",
                data: deletedStudent[0]
            }));
        } else {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({
                message: "Student not found"
            }));
        }
    }
    // Route not supported
    else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({
            message: "Route not supported"
        }));
    }
});

server.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
});