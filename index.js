const https = require("https");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const { ok } = require("assert");
const app = express();
const PORT = process.env.PORT || 3001;
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;

const sendResultScan = require("./sendResultScan");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("สวัสดี express");
});

app.post("/webhook", (req, res) => {
  console.log('req.body =>', req.body.events[0].type)
  res.status(200).send("OK");
});

app.post("/sendResultScan", (req, res) => {
  sendResultScan(req,res);
});

app.post("/fromqr", (req, res) => {
  console.log('req.body =>', req.body.userId)
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
