const noiseMachine = require("../actions/noise-machine");
const dimLights = require("../actions/dim-lights");

const express = require("express");
const router = express.Router();

let dimTimer = null;

router.get("/goodnight", (req, res, next) => {
  if (dimTimer !== null) {
    console.log("Clearing the dim timer");
    clearInterval(dimTimer);
  }

  noiseMachine(true);
  dimTimer = dimLights();
  res.send("Goodnight"); 
});

module.exports = router;