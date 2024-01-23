const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
app.listen(8080, () => {
  console.log("Server is running : 8080");
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/employeelist", (req, res) => {
  con.query(
    "SELECT empname,empdesignation,salary,age,empcode FROM employee",
    function (err, result, fields) {
      if (err) throw err;
      res.status(200);
      res.json(result);
    }
  );
});

app.get("/employee", (req, res) => {
  res.status(200);
  res.json({ message: "Employee list" });
});
