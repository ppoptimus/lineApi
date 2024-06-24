const axios = require("axios");
const express = require("express");
const saveUserScanPoint = require("./saveUserScanPoint");
const app = express();

app.use(express.json());

const sendResultScan = async (req, res) => {
  console.log(req.body);
  let userId = req.body.userId;
  let point = req.body.point;
  let token = req.body.token;

  let result = saveUserScanPoint(userId, point, token);
  if (result === "duplicate") {
    res.status(208).send("duplicate");
  } else if (result === "success") {
    try {
      const response = await axios.post(
        "https://api.line.me/v2/bot/message/push",
        {
          to: userId,
          messages: [
            {
              type: "text",
              text: "คุณได้รับ " + point + " คะแนน",
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer u+UzInq1EMe+NwDM3ERVSjbbu2NB8wQvx6yR3VeBCujuX56SbsFjjAT48jdf5JuRkS+ooCq/pgjoefTodkQZJRzPfy7i5kwT6KhU76mV1Jt2uhNoo7RJhszTdeohBy7z4c43lEbF/09TXOvgxXll1wdB04t89/1O/w1cDnyilFU=",
          },
        }
      );
      res.status(200).json(response.data); // ส่งข้อมูล response กลับไปในกรณีที่สำเร็จ
    } catch (error) {
      if (error.response) {
        // คำขอถูกส่งและเซิร์ฟเวอร์ตอบกลับด้วยสถานะโค้ดที่ไม่ใช่ 2xx
        res.status(error.response.status).json({
          message: "Request failed",
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
        });
      } else if (error.request) {
        // คำขอถูกส่งแต่ไม่มีการตอบกลับ
        res.status(500).json({
          message: "No response received from server",
          request: error.request,
        });
      } else {
        // มีบางอย่างผิดพลาดในการตั้งค่าคำขอ
        res.status(500).json({
          message: "Error in setting up request",
          error: error.message,
        });
      }
    }
  }
};

module.exports = sendResultScan;
