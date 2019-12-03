const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
const cors = require("cors");
const EventHubReader = require("./scripts/event-hub-reader.js");

const iotHubConnectionString =
  "HostName=JRCallanta.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=y9JDuwkrdY3dBAWt2wsHHB/oMoRK7Hp5MuZMBRpaV5o=";
// process.env.IotHubConnectionString;
const eventHubConsumerGroup = "jrGroup";
// process.env.EventHubConsumerGroup;

// Redirect requests to the public subdirectory to the root
console.log("HELLO WORLD");
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res /* , next */) => {
  res.redirect("/");
});

app.use(cors);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log("in wws.Broadcast");
        console.log(`Broadcasting data ${data}`);
        const seat = JSON.parse(data);
        console.log();
        console.log(seat);
        console.log();
        console.log(seat.IotData);
        console.log();
        console.log(seat.IotData.TEST);
        console.log();
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(process.env.PORT || "4000", () => {
  console.log("Listening on %d.", server.address().port);
});

const eventHubReader = new EventHubReader(
  iotHubConnectionString,
  eventHubConsumerGroup
);

(async () => {
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    try {
      const payload = {
        IotData: message,
        MessageDate: date || Date.now().toISOString(),
        DeviceId: deviceId
      };
      wss.broadcast(JSON.stringify(payload));
    } catch (err) {
      console.error("Error broadcasting: [%s] from [%s].", err, message);
    }
  });
})().catch();
