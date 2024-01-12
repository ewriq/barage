// ws/socket.js
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const net = require("net");
const tcp = new net.Socket();

const app = express();
const httpServer = http.createServer(app);

function createws(port, ip, origin) {
  tcp.connect(port, ip);
  const instance = {
    ws: (port, callback) => {
      if (Number.isNaN(port)) {
        process.exit(1);
      } else {
        httpServer.listen(port, () => {
          if (callback) {
            callback();
          }
        });
      }
    },
  };

  const io = socketio(httpServer, {
    cors: {
      origin: origin,
      methods: ["GET", "POST"],
    },
  });

  tcp.on("data", (data) => {
    io.emit("data", data.toString());
  });

  io.use((socket, next) => {
    socket.onAny((event, ...args) => {
      if (event === "data") {
        const data = args[0];
        tcp.write(data);
      }
    });
    next();
  });

  return instance;
}

module.exports = createws;
