const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project2'
});

module.exports = (app) => {
    app.post('/api/account/login', (req, res) => {
        console.log("123");
        var sql = "SELECT * FROM account WHERE username='" + req.body.body.username + "' AND password='" + req.body.body.password + "'";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ news: results });
            console.log(req);
        });
    });

}
