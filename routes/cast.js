const express = require("express");
const router = express.Router();

const castManager = require("../actions/chromecast.js")

router.get("/cast/swap", (req, res, next) => {
  castManager.swapChromecasts();
  res.send("Swapping");
});

router.get("/cast/:streamerName", (req, res, next) => {
  castManager.castStreamer(req.params.streamerName);
  res.send("Casting");
});

module.exports = router;