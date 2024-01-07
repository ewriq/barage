const package = require('../lib/main');


package.on('data', (data) => {
  package.write(`${data}`); 
});

package.start(3000, () => {
  package.websocket(3000, 8080, "localhost", "*",() => {
    console.log("Ws started on port 8080");
  });
  console.log('Server started on port 3000');
});
