const User = require("../models/User");
const bcrypt = require("bcrypt");

// Obtener usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const usersnames = users.map((user) => {
      return { userId: user._id, username: user.username };
    });
    res.status(200).json(usersnames);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Obtener usuario
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Borrar usuario
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("El usuario ha sido eliminado.");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("Usuario no encontrado");
    }
  } else {
    res.status(401).json("Solo puede eliminar su propia cuenta");
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("Solo puede actualizr su propia cuenta");
  }
};

module.exports = { getUsers, getUserById, deleteUser, updateUser };
