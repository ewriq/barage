const { app } = require("../lib/main");

let counter = 0;
 app.on("*",async (data) => {  
  const count = await app.connectioncount()
  console.log(count)
  if (count > 2) {
  app.destroy()
  } else {
    counter += 1;
    console.log(counter);
    app.write("1", data);
  }
});

app.start(3000, () => {
  console.log("Server started on port 3000");
});

app.websocket(3000, 8080, "localhost", "*", () => {
  console.log("Ws started on port 8080");
});

