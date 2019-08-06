const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/',(req,res) => {
    let GameNum = req.query.id;
    if(GameNum !== undefined && req.session.user !== undefined){
        db.query('select categorize from games where pkey = ? rimit 1',GameNum,(err,result) =>{
            if(err) console.log(err);
            db.query('select * from test where pkey = ? order by cnt asc',GameNum,(results,error) =>{
                if (error) console.log(error);
                
            })
        })
    }
    else if(GameNum === undefined && req.session.user !== undefined){
        db.query('select * from Users where class = ? order by score desc',req.session.class,(err,result) =>{
            if(err) console.log(err);
            res.render('test.ejs',{
                result
            })
        })
    }
    else
        res.redirect('/');
})

module.exports = router;