const google = require("./google-home-notifier");
const exec = require("child_process").exec;

const Client = require("castv2-client").Client;
const DefaultMediaReceiver = require("castv2-client").DefaultMediaReceiver;
const mdns = require("mdns");

const CHROMECAST_NAME = "Living Room";

let storedURL;

const streamersMap = {
  "cobalt streak": "cobaltstreak",
  "lobos": "lobosjr",
  "lobos junior": "lobosjr",
  "beach hills": "bchillz",
  "of beach hills": "bchillz",
  "richard hammer": "richard_hammer",
  "this enough": "disnof",
  "this knife": "disnof",
  "does not": "disnof",
  "this on off": "disnof",
  "diss nas": "disnof",
  "agdq": "gamesdonequick",
  "sgdq": "gamesdonequick",
  "santo": "santzo84"
};

function castStreamer(sName) {
  sName = sName.toLowerCase();
  const streamerName = streamersMap[sName];
  if (streamerName === undefined) {
    exec(`echo ${sName} >> output.txt`);
    return google("No streamers were found with that name");
  }

  exec(`livestreamer twitch.tv/${streamerName} best --http-header=Client-ID=jzkbprff40iqj646a697cyrvl0zt2m6 --player-passthrough=http,hls,rtmp -j --yes-run-as-root`, (err, stdout, stderr) => {
    castUrl(JSON.parse(stdout).url);
  });
}

function castUrl(url) {
  if (!url) {
    return google("Streamer not online");
  }
  
  storedURL = url;

  const browser = mdns.createBrowser(mdns.tcp("googlecast"));

  browser.on("serviceUp", function(service) {
    if (service.txtRecord.fn === CHROMECAST_NAME) {
      console.log("Found Device \"%s\" at %s:%d", service.name, service.addresses[0], service.port, service.txtRecord.fn);
      ondeviceup(service.addresses[0], url);
    }
    browser.stop();
  });

  browser.start();
}

function ondeviceup(host, url) {
  let client = new Client();

  client.connect(host, function() {
    client.launch(DefaultMediaReceiver, function(err, player) {
      const media = {
        contentId: url,
        contentType: "video/mp4",
        streamType: "LIVE"       
      };
      
      player.load(media, { autoplay: true }, function(err, status) {
        if (status) { console.log("Media Loaded playerState=%s", status.playerState); }
        client.close();
      });
    });
  });
}

function stopDevice(host) {
  let client = new Client();
  
  client.connect(host, function() {
    client.receiver.stop()
  });
}

function swapChromecasts() {
  const PRIMARY_CHROMECAST = "Living Room";
  const SECONDARY_CHROMECAST = "Kitchen";
  const browser = mdns.createBrowser(mdns.tcp("googlecast"));

  var idleCC;
  var nonIdleCC;

  browser.on("serviceUp", function(service) {
    if (service.txtRecord.fn === PRIMARY_CHROMECAST || service.txtRecord.fn === SECONDARY_CHROMECAST) {
      console.log("Found Device \"%s\" at %s:%d", service.name, service.addresses[0], service.port, service.txtRecord.fn, service);
      if (service.txtRecord.rs === "Ready to play" || service.txtRecord.rs === "Now Casting") {
        nonIdleCC = service.addresses[0];
      }

      if (service.txtRecord.rs === "") {
        idleCC = service.addresses[0];
      }

      console.log("Values are: " + idleCC +  nonIdleCC);
      if (idleCC && nonIdleCC) {
        ondeviceup(idleCC, storedURL);
        stopDevice(nonIdleCC);
      } 
    }

    browser.stop();
  });

  browser.start();  
}

module.exports = { castStreamer, swapChromecasts }; 