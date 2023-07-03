const express = require("express");
const app = express();
const port = 3000;
const http = require("http");
const SocketIO = require("socket.io");
const server = http.createServer(app);
const io = SocketIO(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("messageFromClient", (a, b) => {
      const sum = addNumbers(a, b);
      console.log(`Sum of ${a} and ${b} is ${sum}`);
      socket.emit("messageFromServer", `Sum of ${a} and ${b} is ${sum}`);
  });  
});

function addNumbers(a, b) {
  return a + b;
}
function subtractNumbers(a, b) {
  return a - b;
}

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
