function noiseMachine(status) {
  if (status === undefined) { status = false; }

  const Hs100Api = require("hs100-api");
  const client = new Hs100Api.Client();
  const plug = client.getPlug({host: "192.168.1.143"});

  plug.setPowerState(status);

  client.socket.close();
}

module.exports = noiseMachine;