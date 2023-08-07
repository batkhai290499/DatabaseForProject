const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project2'
});

module.exports = (app) => {
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

    

}
