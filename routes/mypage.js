const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
    db.query('select * from users where email = ?', req.session.user, (err, result) => {
        if (err) console.log(err);
        if (result[0].TEA === 1) {
            db.query('select * from Users where TEA=0 order by score desc', (error, results) => {
                if (error) console.log(error);
                res.render('Sinfo.ejs', {
                    data: results
                })
            })
        }
        else {
            db.query('select * from answer where user = ? order by title,cnt', req.session.user, (err, result) => {
                if (err) console.log(err);
                res.render('smypage.ejs', {
                    data: result
                })
            })
        }
    })
}).get('/detail', (req, res) => {
    db.query('select * from answer where user = ? order by title,cnt', req.query.user, (err, result) => {
        if (err) console.log(err);
        res.render('detail.ejs', {
            data: result
        })
    })
}).get('/pList',(req,res)=>{
    db.query('select * from users where email = ?', req.session.user, (err, result) => {
        if (err) console.log(err);
        if (result[0].TEA === 1) {
            db.query('select * from games where user = ?',req.session.user,(error,results) => {
                if(error) console.log(error);
                res.render('Tmypage',{
                    data : results
                })
            })
        }
        else{
            res.redirect('/')
        }
    })
})

module.exports = router;