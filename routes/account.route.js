var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var userModel = require('../models/user.model');

var router = express.Router();

router.get('/',(req ,  res, next) =>
{
    res.render('Login-out/sign-in-up',{
        layout: false
    });
})

router.post('/register', (req ,  res, next)=>{
    console.log(req.body);
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var daySubscript = moment();

    var entity = {
        Email: req.body.email,
        Password: hash,
        Name: req.body.name,
        Subscribe_date: daySubscript,
        Permission: 4
    }

    userModel.add(entity).then(id =>{
        res.redirect('/');
    })
})

module.exports = router;