var axios = require("axios");

const sendResultScan = async (req, res) => {
  console.log(req.body.to);
  let userId = req.body.to;
  let message = req.body.messages[0].text;
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    "Authorization": "Bearer u+UzInq1EMe+NwDM3ERVSjbbu2NB8wQvx6yR3VeBCujuX56SbsFjjAT48jdf5JuRkS+ooCq/pgjoefTodkQZJRzPfy7i5kwT6KhU76mV1Jt2uhNoo7RJhszTdeohBy7z4c43lEbF/09TXOvgxXll1wdB04t89/1O/w1cDnyilFU=",
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
