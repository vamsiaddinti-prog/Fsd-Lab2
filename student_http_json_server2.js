import http from 'http';

const students = [];

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // Create a new student - POST /students
    if (method === 'POST' && url === '/students') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newStudent = JSON.parse(body);
            students.push(newStudent);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Student created successfully',
                data: newStudent,
            }));
        });
    }

    // Read all students - GET /students
    else if (method === 'GET' && url === '/students') {
        res.writeHead(200,
            { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'All students fetched successfully',
            data: students,
        }));
    }

    // Read a student by ID - GET /students/:id
    else if (method === 'GET' && url.startsWith('/students/')) {
        const studentId = parseInt(url.split('/')[2]);
        const student = students.find((stu) =>
            stu.id === studentId);
        if (student) {
            res.writeHead(200,
                { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Student details fetched successfully',
                data: student,
            }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Student not found'
            }));
        }
    }

    // Delete a student by ID - DELETE /students/:id
    else if (method === 'DELETE' && url.startsWith('/students/')) {
        const studentId = parseInt(url.split('/')[2]);
        const studentIndex = students.findIndex((stu) =>
            stu.id === studentId);
        if (studentIndex !== -1) {
            const deletedStudent =
                students.splice(studentIndex, 1);
            res.writeHead(200,
                { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Student deleted successfully',
                data: deletedStudent[0],
            }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Student not found' }));
        }
    }

    // Update a student by ID - PUT /students/:id
    else if (method === 'PUT' && url.startsWith('/students/')) {
        const studentId = parseInt(url.split('/')[2]);
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updateData = JSON.parse(body);
            const studentIndex = students.findIndex((stu) =>
                stu.id === studentId);
            if (studentIndex !== -1) {
                students[studentIndex] =
                    { ...students[studentIndex], ...updateData };
                res.writeHead(200,
                    { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Student updated successfully',
                    data: students[studentIndex],
                }));
            } else {
                res.writeHead(404,
                    { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(
                    { message: 'Student not found' }));
            }
        });
    }

    // Method / route not supported
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not supported' }));
    }
});

server.listen(4000, () => {
    console.log('Server running at http://localhost:4000/');
});