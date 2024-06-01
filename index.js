const https = require("https");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;

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

  axios
    .post(
      "https://api.line.me/v2/bot/message/push",
      {
        to: "U6e1614ff8a93a29d3b109fb9983a1dd3",
        messages: [
          {
            type: "text",
            text: "message",
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LINE_ACCESS_TOKEN}`,
        },
      }
    )
    .then((response) => {
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      res.status(500).json({ success: false, error });
    });
//   res.send("HTTP POST request sent to the webhook URL!");
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
