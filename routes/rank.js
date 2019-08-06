const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/',(req,res) => {
    let GameNum = req.query.id;
    if(GameNum !== undefined && req.session.user !== undefined){
        db.query('select * from rank where pkey = ? ordry by score desc',GameNum,(err,result) =>{
            if(err) console.log(err);
            res.render('rank.ejs',{
                data : result,
                class : req.session.class,
                username : req.session.user
            })
        })
    }
    else if(GameNum === undefined && req.session.user !== undefined){
        db.query('select * from Users where class = ? order by score desc',req.session.class,(err,result) =>{
            if(err) console.log(err);
            res.render('rank.ejs',{
                data : result,
                username : 'guest',
                class : '0반'
            })
        })
    }
    else
        res.redirect('/');
})

module.exports = router;