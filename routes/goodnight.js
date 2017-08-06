const noiseMachine = require("../actions/noise-machine");
const dimLights = require("../actions/dim-lights");

const express = require("express");
const router = express.Router();

let dimTimer = null;

router.get("/goodnight", (req, res, next) => {
  noiseMachine(true);
  dimTimer = dimLights();
  res.send("goodnight"); 
});

router.get("/goodnight/stop", (req, res, next) => {
  noiseMachine(false);
  clearInterval(dimTimer);
  res.send("stop");
});

module.exports = router;