var express = require('express');
var newspaperModel = require('../models/news.model');

var router = express.Router();

router.get('/', (req, res) => {
    var p = newspaperModel.all();
    
    p.then(rows => {
        res.render('test', {
        newspapers: rows[0]
        });
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;