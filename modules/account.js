const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project2'
});

module.exports = (app) => {
    // API in table Account (Need inner join to show some data in another table)
    app.get('/api/account/views', (req, res) => {
        var sql = "SELECT account.id_account,account.username, account.password, account.name, account.age, account.address, account.phone, department.department_name, salary.money, shift.shift_name ,position.position_name , role.role_name FROM `account` INNER JOIN department ON account.id_department = department.id_department INNER JOIN salary ON account.id_salary = salary.id_salary INNER JOIN shift ON account.id_shift = shift.id_shift INNER JOIN position ON account.id_position = position.id_position INNER JOIN role ON account.id_role = role.id_role ORDER BY account.id_role";
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

    app.post('/api/account/delete', (req, res) => {
        var sql = "DELETE FROM account "
            + "WHERE id_account='" + req.body.id_account + "'";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ position: results });
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

}
