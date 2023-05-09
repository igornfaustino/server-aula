const express = require("express");

const server = express();

server.get("/", (req, res) => {
    res.send("Hello World!!!")
})

server.post("/", (req, res) => {
    res.send("Hello World POST")
})

server.put("/", (req, res) => {
    res.send("Hello World PUT")
})

server.delete("/", (req, res) => {
    res.send("Hello World DELETE")
})

const port = 8080;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});