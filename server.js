const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);
const port = process.env.PORT || 4242;

app.use(express.static(path.resolve("public")));

io.on("connection", (socket) => {
    console.log("an user connected:  ", socket.conn?.id);

    socket.on("message", (message) => {
        io.emit("message", message);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

http.listen(port, () => {
    console.log("listening on port ", port);
});
