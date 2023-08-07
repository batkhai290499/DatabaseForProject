const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project2'
});

module.exports = (app) => {

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


}
