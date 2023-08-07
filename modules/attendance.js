const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project2'
});

module.exports = (app) => {
    //API in Attendance
    app.get('/api/attendances/views/(:id_account)', (req, res) => {
        const id_account = req.params.id_account
        var sql = "SELECT attendance.id_attendance, account.id_account, account.name ,shift.id_shift, shift.shift_name ,attendance.date ,attendance.time_in, attendance.time_out FROM attendance INNER JOIN account ON attendance.id_account = account.id_account INNER JOIN shift ON attendance.id_shift = shift.id_shift WHERE attendance.id_account ='" + id_account + "'";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.json({ attendance: result });
        })
    })
    app.get('/api/attendance/views/(:id_account)', (req, res) => {
        const id_account = req.params.id_account
        var sql = "SELECT attendance.id_attendance, attendance.id_account, attendance.id_shift, attendance.date, attendance.time_in,account.name, "
            + "(SELECT salary.money FROM `salary` INNER JOIN account ON salary.id_salary = account.id_salary WHERE account.id_account = attendance.id_account) AS salary,attendance.time_out "
            + "FROM `attendance`"
            + "INNER JOIN account ON attendance.id_account = account.id_account  "
            + " WHERE account.id_account =  " + id_account + " ORDER BY attendance.id_account ASC";
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




}
