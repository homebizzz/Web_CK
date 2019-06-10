var express = require('express');
var newspaperModel = require('../models/news.model');

var router = express.Router();

router.get('/', (req, res) => {
    var noiBat = newspaperModel.hot();
    var p = newspaperModel.all();

    noiBat.then(rows => {
        res.render('index', {
        newspaper_TinNong: rows[0],
        newspaper_NoiBat1: rows[1],
        newspaper_NoiBat2: rows[2]    
        });
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;