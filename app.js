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
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
// console.log(io);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


app.get('/test', (req, res) => {
  res.json("Home page. Server running okay.");
});

//API for login
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
  var sql = "SELECT account.id_account,account.username, account.password, account.name, account.age, account.address, account.phone, department.department_name, salary.money, shift.shift_name ,position.position_name , role.role_name FROM `account` INNER JOIN department ON account.id_department = department.id_department INNER JOIN salary ON account.id_salary = salary.id_salary INNER JOIN shift ON account.id_shift = shift.id_shift INNER JOIN position ON account.id_position = position.id_position INNER JOIN role ON account.id_role = role.id_role";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ news: results });
  });
});

app.get('/api/account/getById/(:id_account)', (req, res) => {
  const id_account = req.params.id_account
  var sql = "SELECT account.id_account,account.username, account.password, account.name, account.age, account.address, account.phone, department.department_name, department.id_department, salary.money, salary.id_salary, shift.shift_name,shift.id_shift, position.position_name, position.id_position, role.role_name, role.id_role FROM `account` INNER JOIN department ON account.id_department = department.id_department INNER JOIN salary ON account.id_salary = salary.id_salary INNER JOIN shift ON account.id_shift = shift.id_shift INNER JOIN position ON account.id_position = position.id_position INNER JOIN role ON account.id_role = role.id_role WHERE id_account ='" + id_account + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/position/getAll', (req, res) => {
  var sql = "SELECT * FROM position";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ position: results });
  })
})

app.get('/api/salary/getAll', (req, res) => {
  var sql = "SELECT * FROM salary";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ salary: results });
  })
})

app.get('/api/department/getAll', (req, res) => {
  var sql = "SELECT * FROM department";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ department: results });
  })
})

app.get('/api/role/getAll', (req, res) => {
  var sql = "SELECT * FROM role";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ role: results });
  })
})

app.get('/api/shift/getAll', (req, res) => {
  var sql = "SELECT * FROM shift";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ shift: results });
  })
})

app.post('/api/user/insert', (req, res) => {
  var sql = "INSERT "
    + "INTO account(username,password,name,age,address,phone,id_department,id_salary,id_shift,id_position,id_role)"
    + "VALUES('"
    + req.body.username + "','"
    + req.body.password + "','"
    + req.body.name + "','"
    + req.body.age + "','"
    + req.body.address + "','"
    + req.body.phone + "','"
    + req.body.id_department + "','"
    + req.body.id_salary + "','"
    + req.body.id_shift + "','"
    + req.body.id_position + "','"
    + req.body.id_role + "')";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ department: results });
  })
})

app.post('/api/user/edit', (req, res) => {
  var sql = "UPDATE account SET "
    + "username='" + req.body.username + "',"
    + "password='" + req.body.password + "',"
    + "name='" + req.body.name + "',"
    + "age='" + req.body.age + "',"
    + "address='" + req.body.address + "',"
    + "phone='" + req.body.phone + "',"
    + "id_department='" + req.body.id_department + "',"
    + "id_salary='" + req.body.id_salary + "',"
    + "id_shift='" + req.body.id_shift + "',"
    + "id_position='" + req.body.id_position + "',"
    + "id_role='" + req.body.id_role + "'"
    + "WHERE id_account='" + req.body.id_account + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ department: results });
    console.log(sql);

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
    + "INTO department(department_name)"
    + "VALUES('"
    + req.body.name + "')";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ department: results });
  })
})

app.post('/api/department/delete', (req, res) => {
  var sql = "DELETE FROM `department` "
    + "WHERE id_department='" + req.body.id_department + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ department: results });
  });
});

app.post('/api/department/edit', (req, res) => {
  var sql = "UPDATE department SET "
    + "department_name='" + req.body.name + "'"
    + "WHERE id_department='" + req.body.id_department + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ department: results });
  });
});


//API in position table
app.get('/api/position/views', (req, res) => {
  var sql = "SELECT position.id_position, position.position_name, department.department_name FROM position INNER JOIN department ON position.id_department = department.id_department";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json({ position: result });
  })
})
app.post('/api/position/insert', (req, res) => {
  var sql = "INSERT "
    + "INTO `position`(`position_name`,`id_department`)"
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
    + "position_name='" + req.body.name + "',"
    + "id_department ='" + req.body.id_department + "'"
    + "WHERE id_position='" + req.body.id_position + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ position: results });
  });
});

// API in Salary Table
app.get('/api/salary/views', (req, res) => {
  var sql = "SELECT salary.id_salary ,salary.money, position.position_name, position.id_position FROM salary INNER JOIN position ON salary.id_position = position.id_position";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json({ salary: result });
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
    console.log(sql);

  });
});

// API in Shift Table
app.get('/api/shift/views', (req, res) => {
  var sql = "SELECT * FROM shift";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json({ shift: result });
  })
})
app.post('/api/shift/insert', (req, res) => {
  var sql = "INSERT "
    + "INTO `shift`(`shift_name`,`time_in`,`time_out`)"
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
    + "time_in ='" + req.body.time_in + "',"
    + "time_out ='" + req.body.time_out + "'"
    + "WHERE id_shift='" + req.body.id_shift + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ shift: results });
  });
});

//API in Attendance
app.get('/api/attendance/views/(:id_account)', (req, res) => {
  const id_account = req.params.id_account
  var sql = "SELECT attendance.id_attendance, account.id_account, account.name ,shift.id_shift, shift.shift_name ,attendance.date ,attendance.time_in, attendance.time_out FROM attendance INNER JOIN account ON attendance.id_account = account.id_account INNER JOIN shift ON attendance.id_shift = shift.id_shift WHERE attendance.id_account ='" + id_account + "'";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json({ attendance: result });
  })
})
app.get('/api/attendance/views', (req, res) => {
  var sql = "SELECT attendance.id_attendance, account.id_account, account.name ,shift.id_shift, shift.shift_name ,attendance.date ,attendance.time_in, attendance.time_out FROM attendance INNER JOIN account ON attendance.id_account = account.id_account INNER JOIN shift ON attendance.id_shift = shift.id_shift ORDER BY attendance.id_account ASC";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json({ attendanceAll: result });
  })
})
app.post('/api/attendance/insert', (req, res) => {
  var sql = "INSERT "
    + "INTO `attendance`(`id_account`,`id_shift`,`date`,`time_in`)"
    + " VALUES ('"
    + req.body.id_account + "','"
    + req.body.id_shift + "','"
    + req.body.date + "','"
    + req.body.time_in + "')";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ attendance: results });
  })
})

app.post('/api/attendance/edit', (req, res) => {
  var sql = "UPDATE attendance SET "
    + "time_out ='" + req.body.time_out + "'"
    + "WHERE id_attendance='" + req.body.id_attendance + "'";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ attendance: results });
  });
});

//SELECT chat.id_chat, account.id_account, account.name, chat.content, chat.time FROM chat INNER JOIN account ON chat.chat_from = account.id_account WHERE chat_to IN (1,4) AND chat.chat_from IN (4,1) ORDER BY chat.time ASC

//API Chat 1:1 
app.get('/api/chat/views/(:id_account_to)/(:id_account_from)', (req, res) => {
  const id_account_to = req.params.id_account_to
  const id_account_from = req.params.id_account_from
  var sql = "SELECT chat.id_chat, account.id_account, account.name, chat.content, chat.time FROM chat "
    + "INNER JOIN account ON chat.chat_from = account.id_account "
    + "WHERE chat_to IN ('" + id_account_to + "', '" + id_account_from + "') AND chat.chat_from IN ('" + id_account_from + "','" + id_account_to + "')"
    + "ORDER BY chat.time ASC";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(sql);
    
    res.json({ message: result });
  })
})

app.post('/api/chat/insert', (req, res) => {
  var sql = "INSERT "
    + "INTO `chat`(`chat_to`,`chat_from`,`content`,`time`)"
    + " VALUES ('"
    + req.body.chat_to + "','"
    + req.body.chat_from + "','"
    + req.body.content + "','"
    + req.body.time + "')";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    res.json({ message: results });
  })
})
server.listen(4000, () => console.log('Server running in port '));