// client/main.js
const net = require('net');

function connect(port, ip) {
  const eventListeners = {};

  const client = new net.Socket();

  client.connect(port, ip, () => {
    console.log("Connected to server");
  });

  client.on('data', (data) => {
    try {
      const realData = JSON.parse(data.toString());
  
      if (eventListeners[realData.event]) {
        eventListeners[realData.event](realData);
      }
  
      if (eventListeners['*']) {
        eventListeners['*'](realData);
      }
    } catch (error) {
      console.error('Error parsing JSON data:', error);
    }
  });
  

  return {
    write: (event, message) => {
      const jsonString = JSON.stringify({
        event,
        ...message
      });
      client.write(jsonString);
    },
    end: () => {
      client.end();
    },
    on: (event, callback) => {
      eventListeners[event] = callback;
    }
  };
}

module.exports = connect;
