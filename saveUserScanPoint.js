const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://foreveryoung-9112b-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
}

const saveUserScanPoint = async (userId, point, time) => {
  const db = admin.database();
  const usersRef = db.ref("users");
  let result;
  
  let isExsits = await getExsitsToken(userId, time);
  console.log("isExsits = " + isExsits);
  
  if (isExsits) {
    result = "duplicate";
  } else {
    try {
      await usersRef.push({
        userId: userId,
        point: point,
        time: time,
      });
      console.log("บันทึกข้อมูลสำเร็จ");
      result = "success";
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล: ", error);
      result = error;
    }
  }
  
  return result;
};

const getExsitsToken = async (userId, time) => {
  let result = false;
  try {
    const db = admin.database();
    const usersRef = db.ref('users');
    const query = usersRef.orderByChild('userId').equalTo(userId);
    const snapshot = await query.once('value');
    const users = snapshot.val();

    console.log("Users snapshot:", users);

    const filteredUsers = [];
    snapshot.forEach(userSnapshot => {
      const user = userSnapshot.val();
      console.log("User:", user);
      if (user.time === time) {
        filteredUsers.push(user);
      }
    });

    console.log("Filtered Users:", filteredUsers);
    if (filteredUsers.length == 0) {
      result = false;
    } else {
      result = true;
    }
  } catch (error) {
    console.error('การดึงข้อมูลล้มเหลว: ', error);
    throw error;
  }
  return result;
}

module.exports = saveUserScanPoint;
