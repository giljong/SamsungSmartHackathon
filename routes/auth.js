const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const moment = require('moment');

router.get('/', (req, res) => {
    if (!(req.session.user === undefined) && req.session.flag === 0) {
        res.render('auth.ejs', {
            id: req.session.user,
            school: req.session.school
        });
    }
    else
        res.redirect('/');
}).post('/', (req, res) => {
    if (req.session.user === undefined)
        res.redirect('/');
    if (req.session.flag === 1) {
        res.redirect('/');
    }
    else {
        const key = req.body.key;
        const time = moment().format('MMMM Do YYYY, h:mm:ss a');
        const ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        db.query('select AUTHKEY from Users where EMAIL = ?', req.session.user, (err, result) => {
            if (err) console.log(err);
            if ((key === result[0].AUTHKEY)) {
                db.query('update Users set FLAG=1 where EMAIL = ?', req.session.user);
                req.session.flag = 1;
                req.session.save(() => {
                    res.send('<script type="text/javascript">alert("인증성공!(๑′ᴗ‵๑)");window.location.href="/";</script>');
                    console.log(time + ':' + req.session.user + ' 인증성공 - ' + ip)
                })
            }
            else {
                res.send('<script type="text/javascript">alert("인증실패!(ꐦ°д°)");window.location.href="/auth";</script>');
                console.log(time + ':' + req.session.user + ' 인증실패 - ' + ip);
            }
        })
    }
})

module.exports = router;