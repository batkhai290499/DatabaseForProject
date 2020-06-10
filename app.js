const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'web'
});

// connection.connect(function (err) {
//   (err) ? console.log(err) : console.log(connection);
// });

app.get('/api/news', (req, res) => {
  var sql = "SELECT * FROM account ORDER BY accountid DESC";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
});
//SELECT * FROM account WHERE username= '$username' AND password= '$password'
app.post('/api/news/login', (req, res) => {
  var sql = "SELECT * FROM account WHERE username='" + req.body.body.username + "' AND password='" + req.body.body.password + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
    console.log(req);
    

  });
});

app.post('/api/insert', function (req, res) {
  console.log(req.body)
  var sql = "INSERT "
    + "INTO account(username,password,roleID) "
    + "VALUES('"
    + req.body.username + "','"
    + req.body.password + "','"
    + req.body.roleID + "')";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
});

app.post('/api/edit', (req, res) => {
  var sql = "UPDATE account SET "
    + "username='" + req.body.username + "',"
    + "password='" + req.body.password + "',"
    + "roleID='" + req.body.roleID + "'"
    + "WHERE accountID='" + req.body.accountID + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
});
app.post('/api/delete', (req, res) => {
  var sql = "DELETE FROM account "
    + "WHERE accountID='" + req.body.accountID + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
});
app.listen(4000, () => console.log('App listening on port 4000'));