# 🍷 Barage
 
**Barage this is tcp server/client fremawork basic syntax and websocket (socket.io) supported package use network project and web project**

## ☁ Install Package 

+ Node Init

```shell
$ npm init
```

+ Download barage 

```shell
$ npm i barage
```

+ Starter Code

```js
//index.js
const barage = require('barage');

barage.on('data', (data) => {
  package.write(`${data}`); 
});

barage.start(3000, () => {
  barage.websocket(3000, 8080, "localhost", "*",() => {
    console.log("Ws started on port 8080");
  });
  console.log('Server started on port 3000');
});
```

## 🐞 Bug Report
**Use the isues section to report bugs, you can support the development of the project by sending a report.**

Developer ewriq 💙