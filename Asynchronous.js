import fs from "fs";
const Data1 = "This is a sample1 text file created using asynchronous file operations ";
console.log("before writing");
fs.writeFile("sample1.txt", Data1, "utf-8", (err) => {
    if (err) throw err;
    console.log("File created successfully using asynchronous file operations.");
    fs.readFile("sample1.txt", "utf-8", (err, readData) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        console.log("file read successfully using asynchronous file operations.");
        console.log(readData);

        fs.appendFile("sample1.txt", "\nfile data appended successfully", "utf-8", (err) => {
            if (err) throw err;
            console.log("file data appended successfully");
        })
    });
});

console.log("completed writing file using asynchronous file operations");