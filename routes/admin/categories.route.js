var express = require('express');
var categoryModel = require('../../models/admin/categories.model');

var router = express.Router();

router.get('/', (req, res) => {
    var p = categoryModel.all();

    p.then(rows => {
        console.log(rows);
        res.render('admin/admin-categories', {
            layout: false,
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/add', (req, res) => {
    res.render('admin/admin-tags', {
        layout: false
    });
})

module.exports = router;