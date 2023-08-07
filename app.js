const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { listen } = require('socket.io');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Front-end
// DatabaseForProject
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project2'
});
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


var server = require('http').createServer(app);
// console.log(io);
//SELECT chat.id_chat, account.id_account, account.name, chat.content, chat.time FROM chat INNER JOIN account ON chat.chat_from = account.id_account WHERE chat_to IN (1,4) AND chat.chat_from IN (4,1) ORDER BY chat.time ASC
//API Chat 1:1 
app.get('/api/chat/views/(:id_account_to)/(:id_account_from)', (req, res) => {
  const id_account_to = req.params.id_account_to
  const id_account_from = req.params.id_account_from
  var sql = "SELECT chat.id_chat, chat.chat_to, chat.chat_from, account.id_account, chat.content, chat.time FROM chat "
    + "INNER JOIN account ON chat.chat_from = account.id_account "
    + "WHERE chat_to IN ('" + id_account_to + "', '" + id_account_from + "') AND chat.chat_from IN ('" + id_account_from + "','" + id_account_to + "')"
    + "ORDER BY chat.time ASC";
  connection.query(sql, function (err, result) {

    if (err) throw err;
    // console.log("----------------------------");

    // console.log(sql);


    res.json({ message: result });
  })
})

app.post('/api/chat/insert/(:id_account_to)/(:id_account_from)', (req, res) => {
  const id_account_to = req.params.id_account_to
  const id_account_from = req.params.id_account_from
  var sql = "INSERT "
    + "INTO `chat`(`chat_to`,`chat_from`,`content`,`time`)"
    + " VALUES ('"
    + id_account_to + "','"
    + id_account_from + "','"
    + req.body.content + "','"
    + req.body.time + "')";
  console.log(sql);
  connection.query(sql, function (err, results) {
    if (err) throw err;
    room = id_account_to + "," + id_account_from;
    io.to(room).emit('message', req.body);
    res.json({ message: results });
  })

})
var io = require('socket.io').listen(server);
io.on("connection", function (socket) {
  socket.on('room', function (room) {
    socket.join(room);
  });
});

require("./modules/login")(app)
require("./modules/account")(app)
require("./modules/department")(app)
require("./modules/attendance")(app)
require("./modules/chat")(app)
require("./modules/mission")(app)
require("./modules/position")(app)
require("./modules/producer")(app)
require("./modules/resign")(app)
require("./modules/salary")(app)
require("./modules/shift")(app)

server.listen(4000, () => console.log('Server running in port'));