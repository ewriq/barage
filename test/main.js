const package = require("../lib/main");

package.on("*", (data) => {  
  console.log(data);
  package.write("3", {"word":"hello"});
});

package.start(3000, () => {
  console.log("Server started on port 3000");
});
/*
  package.websocket(3000, 8080, "localhost", "*", () => {
    console.log("Ws started on port 8080");
  });
*/