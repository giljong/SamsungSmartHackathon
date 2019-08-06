const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.session.user === undefined){
        res.redirect('/login');
    }
    else{
        res.render('index.ejs',{
            class : req.session.class,
            user : req.session.user
        })
    }
}).post('/',(req,res) => {
    if(req.session.user === undefined){
        res.redirect('/login');
    }
    else{
        db.query('select categorize from games where pkey = ?',req.body.pkey,(err,result) => {
            if(err) console.log(err);
            if(result[0].categorize === 'test'){
                res.redirect('/test?pkey=' + req.body.pkey+'and id=0')
            }
            else{
                res.redirect('/ox?pkey='+req.body.pkey+'and id=0');
            }
        })
    }
})
module.exports = router;