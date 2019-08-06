const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const randomstring = require('randomstring');

router.get('/', (req, res) => {
    db.query('select * from users where email = ?', req.session.user, (err, result) => {
        if (err) console.log(err);
        if (result[0].TEA === 1) {
            res.render('selectC.ejs');
        }
        else {
            res.redirect('/')
        }

    })
}).get('/quiz', (req, res) => {
    res.render('makeQuiz.ejs');
    pkey = randomstring.generate(8);
}).post('/quiz', (req, res) => {
    const title = req.data.title;
    db.query('insert into test (answer,content,cnt,con1,con2,con3,con4,title) values (?,?,?,?,?,?,?,?)', [req.data.answer, req.data.content, req.data.num, req.data.ex1, req.data.ex2, req.data.ex3, req.data.ex4, title]);
    if (req.data.done !== undefined) {
        db.query('insert into games (title, pkey, user, maxcnt) values (?,?,?,?)', [title, pkey, req.session.user, maxcnt]);
        res.redirect('/mypage');
    }
}).get('/ox', (req, res) => {
    res.render('makeQuiz.ejs');
    pkey = randomstring.generate(8);
}).post('/ox', (req, res) => {
    const title = req.data.title;
    db.query('insert into test (answer,content,cnt,con1,con2,title) values (?,?,?,?,?,?)', [req.data.answer, req.data.content, req.data.num, req.data.ex1, req.data.ex2, rtitle]);
    if (req.data.done !== undefined) {
        db.query('insert into games (title, pkey, user, maxcnt) values (?,?,?,?)', [title, pkey, req.session.user, maxcnt]);
        res.redirect('/mypage');
    }
})

module.exports = router;