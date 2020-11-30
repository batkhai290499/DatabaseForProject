const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project'
});

module.exports = (app) => {


    // API in Shift Table
    app.get('/api/shift/views', (req, res) => {
        var sql = "SELECT * FROM shift";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.json({ shift: result });
        })
    })

    app.get('/api/shift/viewById/(:id_account)', (req, res) => {
        const id_account = req.params.id_account
        var sql = "SELECT shift.id_shift, shift.shift_name, shift.time_in, shift.time_out , account.id_account FROM `account` INNER JOIN shift ON account.id_shift =shift.id_shift WHERE account.id_account = '" + id_account + "'";
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


}
