var express = require('express');

var router = express.Router();

router.get('/sign-in-up',(req ,  res, next)=>
{
    res.render('Login-out/sign-in-up');
})

router.post('/sing-in-up', (req ,  res, next)=>{

})

module.exports = router;