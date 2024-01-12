// main.js

const net = require("net");
const createws = require("./ws/socket");

function create() {
  const eventListeners = {};
  let socketInstance;

  const server = net.createServer((socket) => {
    socketInstance = socket;

    socket.on("data", (data) => {
      try {
        const realData = JSON.parse(data.toString());
        if (eventListeners[realData.event]) {
          eventListeners[realData.event](realData);
        }
        if (eventListeners["*"]) {
          eventListeners["*"](realData);
        }
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    });

    socket.on("end", () => {
      console.log("Client disconnected");
    });

    socket.on("error", (error) => {
      if (error.errno === -4077) {
          
      } else {
        process.exit(1);
      }
    });
  });

  const instance = {
    on: (eventName, callback) => {
      eventListeners[eventName] = callback;
    },
    emit: (eventName, data) => {
      if (eventListeners[eventName] && eventName !== "data") {
        eventListeners[eventName](data);
      }
    },
    start: (port, callback) => {
      if (Number.isNaN(port)) {
        process.exit(1);
      } else {
        server.listen(port, () => {
          if (callback) {
            callback();
          }
        });
      }
    },
    write: (event, data) => {
      if (socketInstance) {
        try {
          const payload = typeof data !== "object" ? { data } : data;

          const jsonString = JSON.stringify({ event, ...payload });

          socketInstance.write(jsonString);
        } catch (error) {
          console.error("Error writing to socket:", error);
        }
      } else {
        console.log("Socket is not available yet.");
      }
    },

    websocket: (PortTcp, wsPort, ip, origin, callback) => {
      if (PortTcp) {
        if (wsPort) {
          if (ip) {
            createws(PortTcp, ip, origin).ws(wsPort);
            callback();
          }
        }
      } else {
        process.exit(1);
      }
    },
  };

  return instance;
}

module.exports = create();
