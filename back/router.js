const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/quiz');
const verify = require('./connectionRouter').verify;

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
    .get('/idquizz/:quizzname',
        (req, res) => {
            db.get(
                "select id from quizzes where name=?",
                req.params.quizzname,
                (err, row) => {
                    res.json(row)
                }
            );
        })
    .get('/imgquizz/:quizzname',
        (req, res) => {
            db.get(
                "select picture_url from quizzes where name=?",
                req.params.quizzname,
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
    .get('/question/:id/:idquestion',
        (req, res) => {
            db.get(
                "select * from questions where quizzes_id=? AND id=? ",
                req.params.id,req.params.idquestion,
                (err, row) => {
                    res.json(row)
                }
            );
        })
    .get('/dernierid',
        (req, res) => {
            db.all(
                "select id from questions ORDER BY id DESC LIMIT 1",
                (err, row) => {
                    res.json(row);
                }
            );
        })
    .get('/score/:username',
        (req, res) => {
            db.all(
                "select score from users WHERE username=?",
                req.params.username,
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
    .get('/users/score',
        (req, res) => {
            db.all(
                "select * from users ORDER BY score DESC LIMIT 10",
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
    .get('/users/name/:username',
        (req, res) => {
            db.get(
                "select * from users where username=?",
                req.params.username,
                (err, row) => {
                    res.json(row)
                }
            );
        })
    .get('/recherche/:searchtxt',
        (req, res) => {
            db.all(
                "select * from quizzes WHERE name LIKE ? OR keywords LIKE ?",
                "%" + req.params.searchtxt + "%","%" + req.params.searchtxt + "%",
                (err, row) => {
                    res.json(row)
                }
            );
        })
    .get('/answer/:id',
        (req, res) => {
            db.all(
                "select * from answers where questions_id=?",
                req.params.id,
                (err, row) => {
                    res.json(row)
                }
            );
        })
    .get('/video/:id',
        (req, res) => {
            db.all(
                "select video_url from questions where id=?",
                req.params.id,
                (err, row) => {
                    res.json(row)
                }
            );
        })
    .get('/soluce/:idquestion/:idreponse',
        (req, res) => {
            db.all(
                "select solution from answers WHERE questions_id=? AND id=? ",
                req.params.idquestion,req.params.idreponse,
                (err, row) => {
                    res.json(row)
                }
            );
        })
    .get('/nbsoluce/:idquestion',
        (req, res) => {
            db.all(
                "select COUNT() AS count from answers where questions_id=? AND solution='1'",
                req.params.idquestion,
                (err, row) => {
                    res.json(row)
                }
            );
        })
    .post('/upload', (req, res) => {
        req.files.file.mv(__dirname + '/public/pictures/' + req.body.username + '_' +req.body.time+'.'+req.body.extension,
            (err) => {
                if (err)
                    return res.status(500).send(err);
                res.json({file: req.files.file.name, name:req.body.name});
            }
        );
    })
    .post('/createquizz',
        (req, res) => {
            db.run('insert into quizzes(name,keywords,created_date,id_author,picture_url) values(?,?,DATE(),?,?)', [req.body.name, req.body.keywords,req.body.username,req.body.username+'_'+req.body.time+'.'+req.body.extension],
                (err) => {
                    if (err) {
                        console.log("err :: ", err);
                        res.status(500).end();
                    } else {
                        console.log("Quizz crée : ", req.body.name);
                    }
                }
            );
        })
    .post('/addQuestion/:idquizz',
        (req, res) => {
            db.run('insert into questions(sentence,score,quizzes_id) values(?,?,?)', [req.body.question, req.body.score,req.body.idquizz],
                (err) => {
                    if (err) {
                        console.log("err :: ", err);
                        res.status(500).end();
                    } else {
                        console.log("Question ajoutée : ", req.body.question);

                    }
                }
            );
        })
    .post('/addAnswer/:idquestion',
        (req, res) => {
            db.run('insert into answers(sentence,solution,questions_id) values(?,?,?)', [req.body.reponse, req.body.solucereponse,req.params.idquestion],
                (err) => {
                    if (err) {
                        console.log("err :: ", err);
                        console.log(req.body);
                        res.status(500).end();
                    } else {
                        console.log("created : ", req.body.question);
                    }
                }
            );
        })
    .patch('/users/:id',
        (req, res) => {
            db.run("update persons set username=? where id=?",[req.body,req.params.id]);
            res.status(200).json(req.body);
        })
    .patch('/updatescore/:username/:score',
        (req, res) => {
            db.run("update users set score=? where username=?",[req.params.score,req.params.username]);
            res.status(200).json(req.body);
        })

    .use((req, res) => {
        res.status(400);
        res.json({
            error: "Bad request"
        });
    });