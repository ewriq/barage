const connect = require("../lib/client/main");
const client = connect(3000, "localhost");
client.write("3", { hello: "world" });

client.on("3", (data) => {
  console.log(data);
});
