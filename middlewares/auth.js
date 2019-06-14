module.exports = (req, res, next) => {
    if (!req.user) {
      res.redirect('/account/sign-in-up');
    } else next();
  }
  