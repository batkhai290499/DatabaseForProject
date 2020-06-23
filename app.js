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
  database: 'project'
});

// connection.connect(function (err) {
//   (err) ? console.log(err) : console.log(connection);
// });

//API for login
//SELECT * FROM account WHERE username= '$username' AND password= '$password'
app.post('/api/account/login', (req, res) => {
  var sql = "SELECT * FROM account WHERE username='" + req.body.body.username + "' AND password='" + req.body.body.password + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
    console.log(req);
  });
});

// API in table Account (Need inner join to show some data in another table)
app.get('/api/account/views', (req, res) => {
  var sql = "SELECT * FROM account";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
});

//API in table Department

app.get('/api/department/views', (req, res) => {
  var sql = "SELECT * FROM department";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ department: results });
  })
})

app.post('/api/department/insert', (req, res) => {
  var sql = "INSERT "
    + "INTO department(name)"
    + "VALUES('"
    + req.body.name + "')";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ department: results });
  })
})

app.post('/api/department/delete', (req, res) => {
  var sql = "DELETE FROM department "
    + "WHERE id_department='" + req.body.id_department + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ department: results });
  });
});

app.post('/api/department/edit', (req, res) => {
  var sql = "UPDATE department SET "
    + "name='" + req.body.name + "'"
    + "WHERE id_department='" + req.body.id_department + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ department: results });
  });
});


//API in position table
app.get('/api/position/views', (req,res) => {
  var sql = "SELECT * FROM position";
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.json({position: result});
  })
})
app.post('/api/position/insert', (req, res) => {
  var sql = "INSERT "
    + "INTO `position`(`name`,`id_department`)"
    + " VALUES ('"
    + req.body.name + "','"
    + req.body.id_department + "')";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ position: results });
  })
})

app.post('/api/position/delete', (req, res) => {
  var sql = "DELETE FROM position "
    + "WHERE id_position='" + req.body.id_position + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ position: results });
  });
});

app.post('/api/position/edit', (req, res) => {
  var sql = "UPDATE position SET "
    + "name='" + req.body.name + "',"
    + "id_department ='" + req.body.id_department + "'"
    + "WHERE id_position='" + req.body.id_position + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ position: results });
  });
});

// API in Salary Table
app.get('/api/salary/views', (req,res) => {
  var sql = "SELECT * FROM salary";
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.json({salary: result});
  })
})
app.post('/api/salary/insert', (req, res) => {
  var sql = "INSERT "
    + "INTO `salary`(`money`,`id_position`)"
    + " VALUES ('"
    + req.body.money + "','"
    + req.body.id_position + "')";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ salary: results });
  })
})

app.post('/api/salary/delete', (req, res) => {
  var sql = "DELETE FROM salary "
    + "WHERE id_salary='" + req.body.id_salary + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ salary: results });
  });
});

app.post('/api/salary/edit', (req, res) => {
  var sql = "UPDATE salary SET "
    + "money='" + req.body.money + "',"
    + "id_position ='" + req.body.id_position + "'"
    + "WHERE id_salary='" + req.body.id_salary + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ salary: results });
  });
});

// API in Shift Table
app.get('/api/shift/views', (req,res) => {
  var sql = "SELECT * FROM shift";
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.json({shift: result});
  })
})
app.post('/api/shift/insert', (req, res) => {
  var sql = "INSERT "
    + "INTO `shift`(`name`,`time_in`,`time_out`)"
    + " VALUES ('"
    + req.body.name + "','"
    + req.body.time_in + "','"
    + req.body.time_out + "')";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ shift: results });
  })
})

app.post('/api/shift/delete', (req, res) => {
  var sql = "DELETE FROM shift "
    + "WHERE id_shift='" + req.body.id_shift + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ shift: results });
  });
});

app.post('/api/shift/edit', (req, res) => {
  var sql = "UPDATE shift SET "
    + "name='" + req.body.name + "',"
    + "time_in ='" + req.body.time_in + "'"
    + "time_out ='" + req.body.time_out + "'"
    + "WHERE id_shift='" + req.body.id_shift + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ shift: results });
  });
});
app.listen(4000);