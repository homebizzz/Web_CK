var express = require('express');

var router = express.Router();

router.get('/',(req ,  res, next)=>{
    res.render('sign-in-up', {layout: false});
})

router.post('singin_up', (req ,  res, next)=>{

})

module.exports = router;