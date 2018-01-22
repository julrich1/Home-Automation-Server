const express = require("express");
const router = express.Router();
const { exec } = require('child_process');

const getChannelList = require("../actions/twitch-channel-list");

router.get("/volumeup", (req, res, next) => {
  exec("node ./tools/harmonyHubCLI/harmonyHubCli.js  -l 192.168.1.198 -d 'LG Amp' -c '[\"VolumeUp\", \"VolumeUp\"]'");
  res.send("Done"); 
});

router.get("/volumedown", (req, res, next) => {
  res.send("Done"); 
});

module.exports = router;