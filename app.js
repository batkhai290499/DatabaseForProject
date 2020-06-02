const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'web2'
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