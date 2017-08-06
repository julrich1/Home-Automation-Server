const express = require("express");
const router = express.Router();

const getChannelList = require("../actions/twitch-channel-list.js");

router.get("/twitch-channel-list", (req, res, next) => {
  getChannelList();
  res.send("requesting"); 
});

module.exports = router;