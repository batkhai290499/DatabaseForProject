const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project2'
});

module.exports = (app) => {
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


}
