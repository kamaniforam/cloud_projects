const mysql = require("mysql2");

// create a pool to manage database connections
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//test the database connection
function dbConnect() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.release();
        resolve();
      }
    });
  });
}

module.exports = { dbConnect };
