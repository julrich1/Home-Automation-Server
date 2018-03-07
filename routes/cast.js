const express = require("express");
const router = express.Router();

const castStreamer = require("../actions/chromecast.js").castStreamer;
const swapChromecasts = require("../actions/chromecast.js").swapChromecasts;

router.get("/cast/swap", (req, res, next) => {
  swapChromecasts();
  res.send("Swapping");
});

router.get("/cast/:streamerName", (req, res, next) => {
  castStreamer(req.params.streamerName);
  res.send("Casting");
});

module.exports = router;