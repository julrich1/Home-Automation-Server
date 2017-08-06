function notify(message) {
  const googlehome = require("google-home-notifier");

  googlehome.device("Google-Home-5e7cc4e1b66a6e1a58f5a48b3ca81f13");
  googlehome.notify(message, function(res) {
    console.log(`Sent Notification: ${message}`);
    // console.log(res);
  });
}

module.exports = notify;