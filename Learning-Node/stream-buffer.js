const http = require("http");
const fs = require("fs");
const { request } = require("https");
const { buffer } = require("stream/consumers");

//creating a server using node.js

const server = http.createServer();

//listener
server.on("request", (req, res) => {
  if (req.url === "/read-text" && req.method === "GET") {
    const readableStream = fs.ReadStream(__dirname + "/text/read.txt");
    // const readableStream = fs.ReadStream("./text/read.txt");

    readableStream.on("data", (buffer) => {
      res.write(buffer);
    });

    readableStream.on("end", () => {
      res.end("hello from world");
    });
  }
});

server.listen(5000, () => {
  console.log(`server is listening on port 5000`);
});
