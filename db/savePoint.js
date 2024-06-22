const Database = require("better-sqlite3");
const db = new Database("database.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS userPoint (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      pointBalance INTEGER,
      token TEXT
    )
  `);

function userPoint(userId, pointBalance, token) {
  try {
    const insert = db.prepare(
      "INSERT INTO userPoint (userId, pointBalance, token) VALUES (?, ?, ?)"
    );
    const info = insert.run(userId, pointBalance, token);
    return {
      status: "success",
      message: `A row has been inserted with rowid ${info.lastInsertRowid}`,
    };
  } catch (error) {
    if (error.message.includes("UNIQUE")) {
      return { status: "UNIQUE", message: "Duplicate Scan!" };
    } else {
      return { status: "error", message: error.message };
    }
  }
}

module.exports = userPoint;
