var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var userModel = require('../models/user.model');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  var ls = new LocalStrategy({
    usernameField: 'signInEmail',
    passwordField: 'signInPassword'
  }, (signInEmail, signInPassword, done) => {
    userModel.singleByEmail(signInEmail).then(rows => {
      if (rows.length === 0) {
        return done(null, false, { message: 'Invalid Email.' });
      }

      var user = rows[0];
      var ret = bcrypt.compareSync(signInPassword, rows[0].Password);
      if (ret) {
        return done(null, user);
      }

      return done(null, false, { message: 'Invalid password.' });
    }).catch(err => {
      return done(err, false);
    })
  });

  passport.use(ls);

  passport.serializeUser((user, done) => {
    return done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}