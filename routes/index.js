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
        if(req.body.key == '1234'){
            res.render('oxquiz');
        }
    }
}).get('/2',(req,res) => {
    res.render('ox2');
})
.get('/3',(req,res) => {
    res.render('ox3');
})
.get('/4',(req,res) => {
    res.render('ox4');
}).get('/mypage',(req,res) => {
    res.render('ranking');
}).get('/smypage',(req,res) => {
    res.render('smypage');
})
module.exports = router;