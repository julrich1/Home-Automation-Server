const fs = require("fs");

const bodyParser = require("body-parser");
const morgan = require("morgan");

const express = require("express");
const https = require("https");
const app = express();

const goodnight= require("./routes/goodnight");
const twitch = require("./routes/twitch");
const cast = require("./routes/cast");

// https.createServer({
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem")
// }, app).listen(3001);

app.use(bodyParser.json());
app.use(morgan("short"));

app.use(goodnight);
app.use(twitch);
app.use(cast);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.sendStatus(500);
});
 
app.listen(3001, () => {
  console.log("Listening");
});