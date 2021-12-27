const ModbusTCPValue = require("./src/app/models/Data");

// -------------- SETUP MQTT ------------------
const mqtt = require("mqtt");
require("dotenv").config();
const options = {
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};
var mqtt_url = process.env.MQTT_URL;
const client = mqtt.connect(`mqtt://${mqtt_url}`, options);
console.log(`mqtt://${mqtt_url}`);

client.on("connect", function () {
  client.subscribe("vungtaudata");
  console.log("Connect MQTT Broker");
});

saveModbus();
function saveModbus() {
  client.on("message", function (topic, message) {
    try {
      let data = JSON.parse(message.toString());
      console.log(data);
      console.log("------------");
      data.forEach((item) => {
        dataInsert = {
          station: "Vung Tau",
          deviceName: item['Tag Name'],
          value: item.Value.toString().slice(0,7),
          valueName: item.Tag,
        };
    // postNewValue(dataInsert);
      });
    } catch {
      console.log("Error to read data!");
    }
  });
//deleteValue();
}

async function postNewValue(dataInsert) {
  const newValue = new ModbusTCPValue(dataInsert);
  await newValue
    .save()
    .then(() => {
      console.log("OK");
      idSaved = JSON.stringify(dataInsert.idValue);
      client.publish("valueSaved", idSaved);
    })
    .catch(() => {
      console.log("Not saved!");
    });
}

async function deleteValue() {
  setInterval(async function () {
    await ModbusTCPValue.deleteMany()
      .then(() => {
        console.log("Deleted!");
      })
      .catch(() => {
        console.log("Error!");
      });
  }, 1000);
}
