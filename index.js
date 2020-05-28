const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const clientList = [];
let userMessageList = [];

io.on("connection", (socket) => {
  /* … */
  // on client's connection
  socket.emit("greeting", { message: "Now you're in!" });
  // on client's messages
  socket.on("new message", (message) => {
    console.log(message);
    // put user message in the list
    // userMessageList.push(message);

    io.emit("message", { message: message });
  });

  // on client's disconnection
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = 1557;
const host = "192.168.35.174";

server.listen(port, host, () => {
  console.log("now listening...");
});
