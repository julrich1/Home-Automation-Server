const google = require("./google-home-notifier");
const exec = require("child_process").exec;

const Client = require("castv2-client").Client;
const DefaultMediaReceiver = require("castv2-client").DefaultMediaReceiver;

const CHROMECAST_IP = "192.168.86.92";

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

  exec(`streamlink twitch.tv/${streamerName} best --http-header=Client-ID=jzkbprff40iqj646a697cyrvl0zt2m6 --player-passthrough=http,hls,rtmp -j`, (err, stdout, stderr) => {
    console.log("Casting URL: " + JSON.parse(stdout).url);
    castUrl(JSON.parse(stdout).url);
  });
}

function castUrl(url) {
  if (!url) {
    return google("Streamer not online");
  }

  let client = new Client();
  client.connect(CHROMECAST_IP, function() {
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

module.exports = { castStreamer }; 