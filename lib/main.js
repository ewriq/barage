// main.js

const net = require("net");
const createws = require("./ws/socket");

function create() {
  const eventListeners = {};
  let socketInstance;

  const server = net.createServer((socket) => {
    socketInstance = socket;

    socket.on("data", (data) => {
      // Herhangi bir data geldiğinde tetiklenen olay
      Object.keys(eventListeners).forEach((eventName) => {
        eventListeners[eventName](data);
      });
    });
  });

  const instance = {
    on: (eventName, callback) => {
      eventListeners[eventName] = callback;
    },
    emit: (eventName, data) => {
      if (eventListeners[eventName] && eventName !== 'data') {
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
    write: (message) => {
      if (socketInstance) {
        socketInstance.write(message);
      } else {
        console.log('Socket is not available yet.');
      }
    },
    websocket: (PortTcp, wsPort, ip, origin, callback) => {
      if (PortTcp) {
        if (wsPort) {
          if (ip) {
            createws(PortTcp, ip, origin).ws(wsPort)
            callback()
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
