require('dotenv').config();
const axios = require("axios");
const express = require("express");
const saveUserScanPoint = require("./saveUserScanPoint");
const app = express();

app.use(express.json());

const sendResultScan = async (req, res) => {
  let userId = req.body.userId;
  let point = req.body.point;
  let token = req.body.token;

  //--บันทึกลงฐานข้อมูลและรับ result กลับมา--//
  let result = await saveUserScanPoint(userId, point, token);
  console.log("result:",result);

  if (result === "duplicate") {
    res.status(208).send("duplicate");
  } else if (result === "success") {
    //--push message ไปหา userId นั้นทางแชทไลน์--//
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
            Authorization: process.env.CHANNEL_ACCESS_TOKEN,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      if (error.response) {
        //--คำขอถูกส่งและเซิร์ฟเวอร์ตอบกลับด้วยสถานะโค้ดที่ไม่ใช่ 2xx
        res.status(error.response.status).json({
          message: "Request failed",
          data: error.response.data,
          status: error.response.status,
          headers: error.response.headers,
        });
      } else if (error.request) {
        //--คำขอถูกส่งแต่ไม่มีการตอบกลับ
        res.status(500).json({
          message: "No response received from server",
          request: error.request,
        });
      } else {
        //--มีบางอย่างผิดพลาดในการตั้งค่าคำขอ
        res.status(500).json({
          message: "Error in setting up request",
          error: error.message,
        });
      }
    }
  } else {
    res.status(500).json(result);
  }
};

module.exports = sendResultScan;
