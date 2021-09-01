const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const authRoute = require("../routes/auth");
const usersRoute = require("../routes/users");
const messagesRoute = require("../routes/messages");

const PORT = 5000;

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/messages", messagesRoute);

app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
