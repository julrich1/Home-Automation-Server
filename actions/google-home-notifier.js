function notify(message) {
  const googlehome = require("google-home-notifier");

  googlehome.device("Living room Home");
  googlehome.notify(message, function(res) {
    console.log(`Sent Notification: ${message}`);
    // console.log(res);
  });
}

module.exports = notify;