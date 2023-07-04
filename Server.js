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
      const difference = subtractNumbers(a, b);
      const product = multiplyNumbers(a, b);
      const quotient = divideNumbers(a, b);
      console.log(`Server received message: ${a} and ${b}`);
      socket.emit("messageFromServer", `Sum of ${a} and ${b} is ${sum}`);
      socket.emit("messageFromServer", `difference of ${a} and ${b} is ${difference}`);
      socket.emit("messageFromServer", `produdct of ${a} and ${b} is ${product}`);
      socket.emit("messageFromServer", `quotient of ${a} and ${b} is ${quotient}`);
      socket.emit("messageFromServer","enter the numbers ")

  });  
});

    function addNumbers(a, b) {
        return a + b;
    }
    
    function subtractNumbers(a, b) {
        return a - b;
    }

    function multiplyNumbers(a, b) {
        return a * b;
    }
    
    function divideNumbers(a, b) {
        if(b === 0){
            return 'Cannot divide by zero'
        }
        return a / b;
    }


    server.listen(port, () =>
        console.log(`Calculator app listening on port ${port}!`)
    );
