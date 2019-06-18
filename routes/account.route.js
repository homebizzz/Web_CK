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

router.get('/is-available1', (req, res, next) => {
  var email = req.query.email;
  userModel.singleByEmail(email).then(rows => {
    if (rows.length > 0 && rows[0].Email != req.user.Email){
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

router.post('/register', (req ,  res, next)=>{
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password, saltRounds);
    var daySubscript = moment().format('YYYY-MM-DD');

    var entity = {
        Name: req.body.username,
        Email: req.body.email,
        Password: hash,
        Subscribe_date: daySubscript,
        Permission: 4,
        IsDelete: 0
    }
    userModel.add(entity).then(id =>{
        res.redirect('/account/sign-in-up');
    })
})

router.post('/login', (req , res, next)=>{
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

router.post('/changeInfo', (req , res, next)=>{
  if(req.user.Permission===4)
  {
    var entity={
      Id: req.user.Id,
      Name: req.body.username,
      Email: req.body.email,
      Pseudonym: null
    }
  }
  else{
    var entity={
    Id: req.user.Id,
    Name: req.body.username,
    Email: req.body.email,
    Pseudonym: req.body.pseudonym
    }
  }
 
  userModel.updateInfo(entity).then( n => {
    if(req.user.Permission==4)
    {
      res.redirect('/account/userprofile');
    }
    else
    {
      res.redirect('/account/profile');
    }
  }).catch(err => {
    res.end('error occured.')
  });
})

router.post('/changePasword', (req ,  res, next)=>{
  userModel.single(res.locals.authUser.Id)
  .then(value=>{
    var ret = bcrypt.compareSync(req.body.currentpassword, value[0].Password);
    if(ret)
    {
      var saltRounds = 10;
      var hash = bcrypt.hashSync(req.body.newpassword, saltRounds);
      var entity={
        Id: req.user.Id,
        Password: hash
      }
      userModel.updatePassword(entity).then( n => {
        if(req.user.Permission==4)
        {
          res.redirect('/account/userprofile');
        }
        else
        {
          res.redirect('/account/profile');
        }
      }).catch(err => {
        res.end('error occured.')
      });
    }
    else
    {
      res.end('Sai mật khẩu.')
    }
  });
})

router.post('/deviceroute', (req, res, next) => {
  if(res.locals.authUser.Permission==4)
  {
    res.redirect('/account/userprofile');
  }
  else
  {
    res.redirect('/account/profile');
  }
})

router.get('/userprofile', (req, res, next) => {
  userModel.singleByEmail(res.locals.authUser.Email)
  .then(value =>{
    var expirationdate = moment(value.Subscribe_date).format('YYYY-MM-DD');
    res.render('userprofile',{layout: false, user : value, expirationdatehbs: expirationdate});
  })
})

router.get('/profile', (req, res, next) => {
  userModel.singleByEmail(res.locals.authUser.Email)
  .then(value =>{
    res.render('profile',{layout: false, user : value});
  })
})

router.post('/logout', auth, (req, res, next) => {
  req.logOut();
  res.redirect('/account/sign-in-up');
})

module.exports = router;