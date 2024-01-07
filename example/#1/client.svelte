<script>
    import io from "socket.io-client";
  
    let socket;
    let message = "";
    let msg = "";
  
    const sendMessage = () => {
      socket.emit("data", message);
      message = "";
    };
  
    socket = io("http://localhost:8080");
  
    socket.on("data", (data) => {
      msg = data
    });
  </script>
  
  
  <main>
    <h1>Example #1</h1>
    <p>{msg}</p>
    <input bind:value={message} placeholder="Message" />
    <button on:click={sendMessage}>Send</button>
  </main>
  