const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/',(req,res) => {
    let GameNum = req.query.pkey;
    if(GameNum !== undefined && req.session.user !== undefined){
        db.query('select * from rank where pkey = ? and grade = ? and class = ? ordry by score desc',[GameNum,req.session.grade,req.session.class],(err,result) =>{
            if(err) console.log(err);
            res.render('ranking.ejs',{
                data : result,
                class : req.session.class,
                username : req.session.user
            })
        })
    }
    if(GameNum === undefined && req.session.user !== undefined){
        res.render('ranking.ejs')
        /*db.query('select * from Users where class = ? order by score desc',req.session.class,(err,result) =>{
            if(err) console.log(err);
            res.render('rank.ejs')*/
                //data : result,
                //username : 'guest',
                //class : '0'
            console.log(1)

        //})
    }
    else
        res.redirect('/login');
})

module.exports = router;