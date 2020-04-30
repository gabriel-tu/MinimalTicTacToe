const express = require("express");
const router = express.Router();

//listen for incoming connections 
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;