var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var userModel = require('../models/user.model');
var auth = require('../middlewares/auth');

var router = express.Router();

router.get('/is-available', (req, res, next) => {
    var email = req.query.email;
    userModel.singleByEmail(email).then(rows => {
      if (rows.length > 0) {
        return res.json(false);
      }
  
      return res.json(true);
    })
  })

router.get('/sign-in-up',(req ,  res, next) =>
{
    res.render('Login-out/sign-in-up',{
        layout: false
    });
})

router.get('/profile',(req ,  res, next) =>
{
    res.render('userProfile',{
        layout: false
    });
})

router.post('/register', (req ,  res, next)=>{
    console.log(req.body);
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var daySubscript = moment().format('YYYY-MM-DD');

    var entity = {
        Name: req.body.username,
        Email: req.body.email,
        Password: hash,
        Subscribe_date: daySubscript,
        Permission: 4
    }
    console.log(entity);
    userModel.add(entity).then(id =>{
        res.redirect('/');
    })
})

router.post('/login', (req ,  res, next)=>{
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      return res.render('Login-out/sign-in-up', {
        layout: false,
        err_message: info.message
      })
    }

    req.logIn(user, err => {
      if (err)
        return next(err);

      return res.redirect('/');
    });
  })(req, res, next);
})

router.get('/userprofile', auth, (req, res, next) => {
  res.render('userProfile',{layout: false});
})

router.post('/logout', auth, (req, res, next) => {
  req.logOut();
  res.redirect('/account/sign-in-up');
})

module.exports = router;