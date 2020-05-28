const app = require("express")();
const server = require("https").createServer(app);
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

const port = process.env.PORT;

server.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.status(200).send();
});
server.listen(port, () => {
  console.log("now listening...");
});
