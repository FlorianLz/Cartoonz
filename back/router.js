const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/quiz');

module.exports = router;

router
    .get("/", (req, res) => {
        res.json("Hello world!!");
    })

    .get('/quizz',
        (req, res) => {
            db.all(
                "select * from quizzes",
                (err, rows) => res.json(rows)
            );
    })
    .get('/quizz/:id',
        (req, res) => {
            db.get(
                "select * from quizzes where id=?",
                req.params.id,
                (err, row) => {
                    res.json(row)
                }
            );
        })
    .get('/question/:id',
        (req, res) => {
            db.all(
                "select * from questions where quizzes_id=?",
                req.params.id,
                (err, row) => {
                    res.json(row)
                }
            );
        })
    .get('/users',
        (req, res) => {
            db.all(
                "select * from users",
                (err, rows) => res.json(rows)
            );
        })
    .get('/users/:id',
        (req, res) => {
            db.get(
                "select * from users where id=?",
                req.params.id,
                (err, row) => {
                    res.json(row)
                }
            );
        })

    .use((req, res) => {
        res.status(400);
        res.json({
            error: "Bad request"
        });
    });