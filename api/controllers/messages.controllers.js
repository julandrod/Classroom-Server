const Messages = require("../models/Messages");

// Agregar mensaje
const postMessage = async (req, res) => {
  try {
    const newMessage = new Messages({
      userId: req.body.userId,
      username: req.body.username,
      rol: req.body.rol,
      message: req.body.message,
    });
    const message = await newMessage.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Obtener mensajes
const getMessages = async (req, res) => {
  try {
    const messages = await Messages.find().snapshot();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { postMessage, getMessages };
