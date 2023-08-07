const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project2'
});

module.exports = (app) => {
    //SELECT chat.id_chat, account.id_account, account.name, chat.content, chat.time FROM chat INNER JOIN account ON chat.chat_from = account.id_account WHERE chat_to IN (1,4) AND chat.chat_from IN (4,1) ORDER BY chat.time ASC
    //API Chat 1:1 

    //API in table Producer (not yet)

    app.get('/api/producer/views', (req, res) => {
        var sql = "SELECT * FROM producer";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ producer: results });
        })
    })

    app.post('/api/producer/insert', (req, res) => {
        var sql = "INSERT "
            + "INTO producer(producer_name)"
            + "VALUES('"
            + req.body.name + "')";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ producer: results });
        })
    })

    app.post('/api/producer/delete', (req, res) => {
        var sql = "DELETE FROM `producer` "
            + "WHERE id_producer='" + req.body.id_producer + "'";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ producer: results });
        });
    });

    app.post('/api/producer/edit', (req, res) => {
        var sql = "UPDATE producer SET "
            + "producer_name='" + req.body.name + "'"
            + "WHERE id_producer='" + req.body.id_producer + "'";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ producer: results });
        });
    });




}
