const express = require("express")();
const server = require("http").createServer(express);
const io = require("socket.io")(server);
const path = require("path");

const port = process.env.PORT || 1557;

server.listen(port, () => {
  console.log("now listening...");
});

// express.use(path);
express.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.status(200);
  res.sendFile("/chat.html", { root: __dirname });
});

// const clientList = [];
// let userMessageList = [];

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

// app.get("/", (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");

//   res.status(200);
// });
