var axios = require("axios");

const sendResultScan = async (req, res) => {
  const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;
  const authorization = `Bearer ${LINE_ACCESS_TOKEN}`;
  console.log(req.body.to);
  let userId = req.body.to;
  let message = req.body.messages[0].text;
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Authorization": authorization,
  };

  let bodyContent = JSON.stringify({
    to: userId,
    messages: [
      {
        type: "text",
        text: message,
      },
    ],
  });

  let reqOptions = {
    url: "https://api.line.me/v2/bot/message/push",
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };
  let response = await axios.request(reqOptions);
  return res.status(200).json(response.data);
};
module.exports = sendResultScan;
