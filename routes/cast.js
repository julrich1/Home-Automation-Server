const express = require("express");
const router = express.Router();

const castStreamer = require("../actions/chromecast.js");

router.get("/cast/:streamerName", (req, res, next) => {
  castStreamer(req.params.streamerName);
  res.send("Casting");
});

module.exports = router;