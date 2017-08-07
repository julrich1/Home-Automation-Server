const express = require("express");
const router = express.Router();

const getChannelList = require("../actions/twitch-channel-list");

router.get("/twitch-channel-list", (req, res, next) => {
  getChannelList();
  res.send("Requesting"); 
});

module.exports = router;