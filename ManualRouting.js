import http from "http";
const server=http.createServer((req,res)=>{
    if(req.method==='POST'&&req.url==='/students'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<h1>Student Created </h1>');
        res.end();
    }
    else if(req.method==='GET'&&req.url==='/students'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<h1>All students</h1>');
        res.end();
    }
    else if(req.method==='GET'&&req.url==='/students/101'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<h1>Student Details</h1>');
        res.end();
    }
    else if(req.method==='PUT'&&req.url.startsWith('/students/')){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end();

    }
    else if(req.method==='DELETE'&&req.url.startsWith('/students/')){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<h1>Student Deleted</h1>');
        res.end();
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.write('<h1>Page not Found</h1>');
        res.end();
    }
});
server.listen(4000,()=>{
    console.log("Server running at http://localhost:4000");
})