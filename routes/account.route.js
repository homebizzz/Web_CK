var express = require('express');

var router = express.Router();

router.get('/',(req ,  res, next) =>
{
    res.render('Login-out/sign-in-up',{
        layout: false
    });
})

router.post('/', (req ,  res, next)=>{
})

module.exports = router;