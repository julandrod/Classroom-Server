const {
  postMessage,
  getMessages,
} = require("../controllers/messages.controllers");

const router = require("express").Router();

router.post("/", postMessage);
router.get("/", getMessages);

module.exports = router;
