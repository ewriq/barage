const { connect } = require("../lib/main");

const client = connect(3000, "localhost");

client.write("1", {
  data: {
    hello: "world",
  },
});

client.on("1", (data) => {
  console.log(data)
  client.write("1", {
    data: {
      hello: "world",
    },
  });
});
