const {
  getUserById,
  deleteUser,
  getUsers,
  updateUser,
} = require("../controllers/users.controllers");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
