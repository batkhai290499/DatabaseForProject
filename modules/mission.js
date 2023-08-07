const multer = require('multer');
const path = require('path');
const express = require('express');

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project2'
});

module.exports = (app) => {

    //API in table Mission
    app.get('/api/mission/viewsAllEmployee', (req, res) => {
        var sql = "SELECT id_account, name FROM account";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ employee: results });
        })
    })

    //Upload route
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            // console.log(file);
            // console.log("---");
            // console.log(path.extname(file.originalname));
            cb(null, file.originalname);
        }
    });
    const fileFilter = (req, file, cb) => {
        // console.log(file);
        // if (file.mimetype == 'pdf/jpeg' || file.mimetype == 'pdf/png/jpg') {

        // } else {
        //   cb(null, false);
        // }
        cb(null, true);
    }
    const upload = multer({ storage: storage, fileFilter: fileFilter });


    app.post('/upload', upload.single('image'), (req, res) => {
        var sql = "INSERT "
            + "INTO mission(`name_file`, `comment`, `id_account`, `title`,`start_time`,	`end_time`	,`status`	)"
            + " VALUES ('"
            + req.body.name_file + "','"
            + req.body.comment + "','"
            + req.body.id_account + "','"
            + req.body.title + "','"
            + req.body.start_time + "','"
            + req.body.end_time + "','"
            + req.body.status + "')";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ mission: results });
        })
    });

    app.get('/api/mission/viewsAllmission', (req, res) => {
        var sql = "SELECT mission.id_mission, mission.title, mission.comment, account.name, mission.name_file, mission.start_time, mission.end_time, status_mission.status FROM `mission` INNER JOIN status_mission ON status_mission.id_status_mission = mission.status INNER JOIN account ON account.id_account = mission.id_account";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ mission: results });
        })
    })

    app.get('/api/mission/viewsMissionByName/(:name)', (req, res) => {
        const name = req.params.name
        var sql = "SELECT mission.id_mission, mission.title, mission.comment, account.name, mission.name_file, mission.start_time, mission.end_time, status_mission.status FROM `mission` INNER JOIN status_mission ON status_mission.id_status_mission = mission.status INNER JOIN account ON account.id_account = mission.id_account WHERE account.name = '" + name + "'";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ MissionEmployee: results });
        })
    })

    app.get('/api/mission/getByIdAccount/(:id_account)', (req, res) => {
        const id_account = req.params.id_account
        var sql = "SELECT mission.id_mission, mission.title, mission.comment, account.name, mission.name_file, mission.start_time, mission.end_time, status_mission.status FROM `mission` INNER JOIN status_mission ON status_mission.id_status_mission = mission.status INNER JOIN account ON account.id_account = mission.id_account WHERE mission.id_account ='" + id_account + "'";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ MissionByIdAccount: results });
        })
    })

    app.get('/api/mission/getByIdMission/(:id_mission)', (req, res) => {
        const id_mission = req.params.id_mission
        var sql = "SELECT mission.id_mission, mission.title, mission.comment, account.name, mission.name_file, mission.start_time, mission.end_time, status_mission.status FROM `mission` INNER JOIN status_mission ON status_mission.id_status_mission = mission.status INNER JOIN account ON account.id_account = mission.id_account WHERE mission.id_mission ='" + id_mission + "'";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ MissionByIdMission: results });
        })
    })

    app.post('/api/mission/updateByEmployee', (req, res) => {
        var sql = "UPDATE Mission SET "
            + "status ='" + req.body.status + "'"
            + "WHERE id_mission='" + req.body.id_mission + "'";
        connection.query(sql, function (err, results) {
            if (err) throw err;
            res.json({ MissionByEmployee: results });
        });
    });





}
