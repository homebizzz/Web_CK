var express = require('express');
var userModel = require('../models/profile.model');

var router = express.Router();

router.get('/', (req, res) => {
        res.render('profile', {
            layout: false,
        });
})

module.exports = router;