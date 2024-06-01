const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN;

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.send('สวัสดี express')
})

app.post("/webhook", (req, res) => {
    console.log('req.body =>', JSON.stringify(req.body,null,2))
    res.send("HTTP POST request sent to the webhook URL!")
  })

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})