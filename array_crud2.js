const students=[
    {id:1,name:"Ravi",age:20},
    {id:2,name:"Raju",age:22},
    {id:3,name:"Deva",age:20},
]

const newStudent={id:4,name:"Vikram",age:21};
students.push(newStudent);
console.log("Student added: ",newStudent);

console.log("All students: ",students);

const studentReadId=2;
const student=students.find((stu)=>stu.id===studentReadId);
if(student){
    console.log("Student with ID: ",student);
}else{
    console.log(`Student with id ${studentReadId}`);
}

const UpdateId=3;
const updateData={id:3,name:"Rohan",age:21};
const updateIndex=students.findIndex((stu)=>stu.id===updaateId);
if(updateIndex!==-1){
    students[updateIndex]={
        ...students[updateIndex],
        ...updateData
    };
    console.log("Student update: ",students[updateIndex]);

}else{
    console.log(`Student with id ${updateIndex} not found`);
}

const deleteId=1;
const deleteIndex=students.findIndex(
    (stu)=>stu.id===deleteId
);
if(deleteIndex!==-1){
    const deleteStudents=students.splice(deleteIndex,1);
    console.log("Student deleted: ",deleteStudents[0]);
}else{
    console.log(`Student with id ${deleteId} not found`);
}

console.log("Students after CRUD: ",students);