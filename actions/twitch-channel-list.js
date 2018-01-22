const request = require("request");
const google = require("./google-home-notifier");

const TWITCH_API_KEY = require("../API_KEYS/twitch_api_keys.js");
const TWITCH_USER_ID = "8095777";

const FOLLOWED_STREAMERS_URL = `https://api.twitch.tv/helix/users/follows?from_id=${TWITCH_USER_ID}&first=100`;
const ONLINE_STREAMERS_URL = "https://api.twitch.tv/helix/streams";
const USER_DETAILS_URL = "https://api.twitch.tv/helix/users";

function getChannelList() {
  const HEADERS =  { "Client-ID": TWITCH_API_KEY };

  const httpRequest = {
    url: FOLLOWED_STREAMERS_URL,
    headers: HEADERS
  };

  request(httpRequest, (err, res, body) => {
    if (err) { 
      google("There was an error getting info from Twitch");
      return console.log(err); 
    }

    let streamerIds = "";
    const streamers = JSON.parse(body).data;
    for (const streamer of streamers) {
      streamerIds += "user_id=" + streamer.to_id + "&"
    }

    const httpRequest = {
      url: `${ONLINE_STREAMERS_URL}?${streamerIds}`,
      headers: HEADERS
    }

    let onlineIds = "";

    request(httpRequest, (err, res, body) => {
      if (err) { 
        google("There was an error getting info from Twitch");
        return console.log(err); 
      }

      const streamers = JSON.parse(body).data;
      if (streamers.length === 0) {
        return google("Nobody is online");
      }

      const onlineCount = streamers.length; 

      for (const streamer of streamers) {
        onlineIds += "id=" + streamer.user_id + "&";
      }

      const httpRequest = {
        url: `${USER_DETAILS_URL}?${onlineIds}`,
        headers: HEADERS
      };

      let onlineStreamers = "";

      request(httpRequest, (err, res, body) => {
        if (err) { 
          google("There was an error getting info from Twitch");
          return console.log(err); 
        }

        const streamers = JSON.parse(body).data;
        for (const streamer of streamers) {
          onlineStreamers += streamer.display_name + ", ";
        }

        if (onlineCount === 1) {
          onlineStreamers += "is online";
        }
        else {
          onlineStreamers += "are online";
        }
        console.log("Online streamers: " + onlineStreamers);

        google(onlineStreamers);
      }); 
    });
  });
}

module.exports = getChannelList;