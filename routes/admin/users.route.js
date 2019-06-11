var express = require('express');
var userModel = require('../../models/admin/users.model');

var router = express.Router();

router.get('/', (req, res) => {
    var p = userModel.all();

    p.then(rows => {
        res.render('admin/admin-users', {
            layout: false,
            users: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;