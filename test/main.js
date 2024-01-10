const package = require('../lib/main');


package.on('1', (data) => {
  console.log("Only Event name :", data);
});

package.on('*', (data) => {
  console.log(`All data`,data);
  package.write("2",{"ewriq":"1", data})
});

package.start(3000, () => {
  package.websocket(3000, 8080, "localhost", "*",() => {
    console.log("Ws started on port 8080");
  });
  console.log('Server started on port 3000');
});
