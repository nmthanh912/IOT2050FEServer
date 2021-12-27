require("dotenv").config();
const aedes = require("aedes")();

aedes.authenticate = function (client, username, password, callback) {
  console.log("Client connected. Login ...");
  //console.log(password.toString());
  callback(
    null,
    username === process.env.MQTT_BROKER_USERNAME &&
      password.toString() === process.env.MQTT_BROKER_PASSWORD
  );
};

const server = require("net").createServer(aedes.handle);
const port = process.env.MQTT_BROKER_PORT;

server.listen(port, function () {
  console.log("MQTT Server started and listening on port ", port);
});

aedes.on("clientError", function (client, err) {
  //console.log('client error', client.id, err.message, err.stack)
  console.log("client error");
});

aedes.on("connectionError", function (client, err) {
  //console.log('client error', client, err.message, err.stack)
  console.log("client error");
});

aedes.on("publish", function (packet, client) {
  if (client) {
    console.log(
      "message from client ",
      client.id,
      packet.topic,
      packet.payload.toString()
    );
  }
});

aedes.on("subscribe", function (subscriptions, client) {
  if (client) {
    console.log("subscribe from client", subscriptions, client.id);
  }
});

aedes.on("client", function (client) {
  console.log("new client", client.id);
});

aedes.on("message", (topic, message) => {
  console.log(
    `MQTT Client Message.  Topic: ${topic}.  Message: ${message.toString()}`
  );
});
