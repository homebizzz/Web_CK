var express = require('express');
var tagModel = require('../../models/admin/tags.model');

var router = express.Router();

router.get('/', (req, res) => {
    var p = tagModel.all();

    p.then(rows => {
        res.render('admin/admin-tags', {
            layout: false,
            tags: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;