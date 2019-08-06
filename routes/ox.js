const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/', (req, res) => {
    let GameNum = req.query.pkey;
    let GameCnt = req.query.id;
    if (GameNum !== undefined && req.session.user !== undefined) {
        db.query('select * from oxquiz where cnt = ? pkey = ?', [GameCnt, GameNum, GameNum], (err, result) => {
            if (err) console.log(err);
            db.query('select MAXCNT from games where pkey= ?', GameNum, (error, results) => {
                if (error) console.log(error);
                res.render('ox.ejs', {
                    maxcnt: results[0].MAXCNT,
                    pkey: GameNum,
                    data: result,
                    title: result[0].title
                })
            })
        })
    }
    else if (GameNum === undefined && req.session.user !== undefined) {
        res.redirect('/')
    }
    else
        res.redirect('/login');
}).post('/', (req, res) => {
    let user = req.session.user;
    let cla = req.session.class
    let answer = req.body.answer;
    let confirm = '틀림';
    db.query('select * from oxquiz where pkey = ?', answer, (err, result) => {
        if (err) console.log(err);
        if (result[0].answer === answer) {
            confirm = '맞음';
            req.session.cnt += 1;
        }
        db.query('insert into answers (user, cnt, answer,pkey,confirm,title) values (?,?,?,?,?,?)', [user, req.query.id, answer, req.query.pkey, confirm,result[0].title]);
    })
}).get('/result', (req, res) => {
    db.query('select confirm,cnt from answers where user = ?', req.session.user, (err, result) => {
        if (err) console.log(err);
        db.query('update Users set score = score + ? where email = ?', [req.session.cnt, req.session.user]);
        res.render('result', {
            data: result
        })
    })
}).get('/result/mail', (req, res) => {
    db.query('select cnt,confirm from answers where user = ? ordey by cnt', req.session.user, (err, result) => {
        if (err) console.log(err);
        let Str;
        for (var i = 0; i < result.length; i++) {
            Str += result[i].cnt + '번 문제 ' + result[i].confirm + '\n';
        }
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'minjong5054@gmail.com',
                pass: 'pj83918332'
            }
        });
        const mailOptions = {
            from: 'CheckPoint',
            to: req.session.user,
            subject: 'OX퀴즈 결과',
            text: Str
        };
        transporter.sendMail(mailOptions, (err, response) => {
            if (err)
                console.log(err);
            else
                console.log(response, time + ' - ' + ip);
        })
        res.send('<script type="text/javascript">alert("이메일로 결과를 보냈습니다. 확인해주세요.");window.location.href="/";</script>')
    })
})
module.exports = router;