var express = require('express');
var categoryModel = require('../../models/admin/categories.model');

var router = express.Router();

router.get('/', (req, res) => {
    var p = categoryModel.all();
    categoryModel.single(Id).then(rows => {
        category: rows
    })
    p.then(rows => {
        res.render('admin/admin-categories', {
            layout: false,
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });

    
})



module.exports = router;