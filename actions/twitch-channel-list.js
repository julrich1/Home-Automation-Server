const request = require("request");
const google = require("./google-home-notifier");

const TWITCH_API_KEY = require("../API_KEYS/twitch_api_keys.js");
const TWITCH_USER = "shadowgate";

let onlineList = "";

function getChannelList() {
  const onlineUrl = `https://api.twitch.tv/kraken/users/${TWITCH_USER}/follows/channels?client_id=${TWITCH_API_KEY}`;

  const followedStreamers = [];

  request(onlineUrl, (err, res, body) => {
    if (err) { 
      google("There was an error getting info from Twitch");
      return console.log(err); 
    }

    let i = 0;
    for (const streamer of JSON.parse(body).follows) {
      followedStreamers[i++] = streamer.channel.name;
    }

    let promises = [];
    
    for (const streamer of followedStreamers) {
      promises.push(getStreamInfo(streamer));
    }

    Promise.all(promises)
      .then((result) => {
        onlineList = result.reduce((streamers, streamer) => {
          if (streamer) { streamers += `${streamer}, `; }
          return streamers;
        }, "");

        if (onlineList.length < 1) { onlineList = "Nobody is online"; }
        else if (onlineList.length < 2) { onlineList += "is online"; }
        else { onlineList += "are online"; }

        google(onlineList);
      })
      .catch((err) => {
        console.log(err);
        google("There was an error getting info from Twitch");
      });
  });
}

function getStreamInfo(streamer) {
  return new Promise((resolve, reject) => {
    request(`https://api.twitch.tv/kraken/streams?client_id=${TWITCH_API_KEY}&channel=${streamer}`, (err, res, body) => {
      if (err) { return reject(err); }
      const data = JSON.parse(body);
      
      if (data.streams) {
        if (data.streams.length) {
          return resolve(streamer);
        }
      }
      return resolve(null);
    });
  });
}

module.exports = getChannelList;