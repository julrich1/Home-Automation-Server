function startDim() {
  const minLen = 30;
  const secsLen = minLen * 60;
  const perTick = 255 / secsLen;

  const Hue = require("philips-hue");
  const HUE_API_KEY = require("../API_KEYS/hue_api_key.js");
  const hue = new Hue;

  hue.bridge = "192.168.1.212";  // from hue.getBridges
  hue.username = HUE_API_KEY; // from hue.auth

  let timePassed = 0;

  let lightState = {bri: 255, sat: 255, hue: 0}; //Red Full Brightness
  var brightness = 255;

  hue.light(9).on();
  hue.light(4).on();
  hue.light(9).setState(lightState);
  hue.light(4).setState(lightState);

  const dimTimer = setInterval(function() {
    timePassed += 1;
    brightness -= perTick;
    lightState.bri = Math.round(brightness);

    //console.log(timePassed);
    //console.log(lightState.bri);

    hue.light(9).setState(lightState);
    hue.light(4).setState(lightState);

    if (lightState.bri <= 0) {
      hue.light(9).off();
      hue.light(4).off();
      clearInterval(dimTimer);
    }

  }, 1000);

  return dimTimer;
}

module.exports = startDim;