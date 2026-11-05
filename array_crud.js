const students = [
    { id: 1, name: "Ravi", age: 20 },
    { id: 2, name: "Raju", age: 22 },
    { id: 3, name: "Deva", age: 20 }
];
// Create a student
const newStudent = { id: 4, name: "Vikram", age: 21 };
students.push(newStudent);
console.log("Student added:", newStudent);

// Read all students
console.log("All students:", students);

// Read a student by ID
const studentReadId = 2;
const student = students.find(
    (stu) => stu.id === studentReadId);
if (student) {
    console.log("Student with ID:", student);
} else {
    console.log(`Student with id ${studentReadId} not found`);
}
// Update a student by ID
const updateId = 3;
const updateData = { id: 3, name: "Rohan", age: 21 };
const updateIndex = students.findIndex(
    (stu) => stu.id === updateId);
if (updateIndex !== -1) {
    students[updateIndex] = {
        ...students[updateIndex],
        ...updateData
    };
    console.log("Student updated:", students[updateIndex]);
} else {
    console.log(`Student with id ${updateId} not found`);
}

// Delete a student by ID
const deleteId = 1;
const deleteIndex = students.findIndex(
    (stu) => stu.id === deleteId);
if (deleteIndex !== -1) {
    const deletedStudents = students.splice(deleteIndex, 1);
    console.log("Student deleted:", deletedStudents[0]);
} else {
    console.log(`Student with id ${deleteId} not found`);
}

// Display students after CRUD operations
console.log("Students after CRUD:", students);