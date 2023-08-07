const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project2'
});

module.exports = (app) => {
    //API  in Resign

    app.post('/api/resign/insert/(:id_account)', (req, res) => {
        const id_account = req.params.id_account
        var sql = "INSERT "
            + "INTO resign( `title`, `content`, `id_account`, `date`, `status`)"
            + "VALUES('"
            + req.body.title + "','"
            + req.body.content + "','"
            + id_account + "','"
            + req.body.date + "','"
            + req.body.status + "')";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ resign: results });
        })
    })

    app.get('/api/resign/views', (req, res) => {
        var sql = "SELECT * FROM resign";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ resign: results });
        })
    })

    app.post('/api/resign/edit', (req, res) => {
        console.log(req.body);
        var sql = "UPDATE resign SET "
            + "status='" + req.body.status + "'"
            + "WHERE id_resign='" + req.body.id_resign + "'";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ resign: results });
        });
    });

    app.get('/api/resign/viewsById/(:id_account)', (req, res) => {
        const id_account = req.params.id_account
        var sql = "SELECT * FROM resign WHERE resign.id_account ='" + id_account + "'";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ resignById: results });
        })
    })




}
