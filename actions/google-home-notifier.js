function notify(message) {
  const googlehome = require("google-home-notifier");

  googlehome.device("192.168.86.32");
  googlehome.notify(message, function(res) {
    console.log(`Sent Notification: ${message}`);
    // console.log(res);
  });
}

module.exports = notify;