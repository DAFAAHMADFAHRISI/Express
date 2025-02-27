let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "p2",
});
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("connection Succes");
  }
});

module.exports = connection;
