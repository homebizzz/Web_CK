var express = require('express');
var postsModel = require('../../models/admin/posts.model');

var router = express.Router();

router.get('/', (req, res) => {
    var p = postsModel.all();

    p.then(rows => {
        res.render('admin/admin-posts', {
            layout: false,
            posts: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;