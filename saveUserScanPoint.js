const saveUserScanPoint = async (userId, point, time) => {
  var admin = require("firebase-admin");

  var serviceAccount = require("./serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://foreveryoung-9112b-default-rtdb.asia-southeast1.firebasedatabase.app",
  });

  const db = admin.database();

  const usersRef = db.ref("users");
  const newUserRef = usersRef.push();
  newUserRef
    .set({
      userId: userId,
      point: point,
      time: time,
    })
    .then(() => {
      console.log("บันทึกข้อมูลสำเร็จ");
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล: ", error);
    });
};
module.exports = saveUserScanPoint;
