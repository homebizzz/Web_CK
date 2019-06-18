var express = require('express');
//var moment = require('moment');
var uploadModel = require('../../models/writer/posts.model');

var router = express.Router();

router.get('/',(req ,  res, next) =>
{
    var temp = uploadModel.loadByConfirmID();

    temp.then(rows => {
        console.log(rows);
        res.render('Writer/Writer-posts', {
            layout: false,
            news: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;