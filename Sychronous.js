import fs from "fs";
const data = "This is a sample text file created using  synchronous file operations in Node.js.";
fs.writeFileSync("sample.txt", data, 'utf-8');
console.log("File created successfully using synchronous file operations.");


const readData = fs.readFileSync("sample.txt", "utf-8");
console.log("file read successfully using synchronous file operations.");
console.log(readData);
console.log("end of synchronous file operations");
// Append data
fs.appendFileSync("sample.txt", "\nFile data appended successfully.", "utf-8");

console.log("Data appended successfully.");