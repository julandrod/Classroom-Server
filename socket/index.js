const io = require("socket.io")(7001, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  let nombre;

  socket.on("conectado", (username, rol) => {
    nombre = username;
    
    socket.broadcast.emit("mensajes", {
      username,
      rol,
      message: `${username} (${rol}) ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (username, rol, message) => {
    
    io.emit("mensajes", { username, rol, message });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      message: `${nombre} ha abandonado la sala`,
    });
  });
});
