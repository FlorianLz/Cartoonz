const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/quiz');

module.exports = router;

router
    .get("/", (req, res) => {
        res.json("Hello world!!");
    })

    .use((req, res) => {
        res.status(400);
        res.json({
            error: "Bad request"
        });
    })

    .get('/quizz',
        (req, res) => {
            db.all(
                "select * from quizzes",
                (err, rows) => res.json(rows)
            );
    });