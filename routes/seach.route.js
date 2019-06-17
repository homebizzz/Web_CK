var express = require('express');
var newspaperModel = require('../models/search.model');
var moment = require('moment');

var router = express.Router();

router.get('/', (req, res, next) => {
    let key = req.query.search;
    Promise.all([
        newspaperModel.allByKey(key),
        newspaperModel.allByNewPost(),
        newspaperModel.allByNewEach("Mobile"),
        newspaperModel.allByNewEach("Laptop"),
        newspaperModel.allByNewEach("AI"),
        newspaperModel.allByNewEach("Camera"),
        newspaperModel.allByNewEach("Design"),

        ]).then(([Mobiles, NewPosts, EachMobile, EachLaptop, EachAI, EachCamera, EachDesign]) => {
            Mobiles.forEach(mobile => {
                mobile.Created_date = moment(mobile.Created_date).format('YYYY-MM-DD');
            });
            console.log(key);
            console.log(Mobiles[0]);


            NewPosts.forEach(newPost => {
                newPost.Created_date = moment(newPost.Created_date).format('YYYY-MM-DD');
            });
            //
            EachMobile.forEach(temp => {
                temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
            });

            EachLaptop.forEach(temp => {
                temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
            });

            EachAI.forEach(temp => {
                temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
            });

            EachCamera.forEach(temp => {
                temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
            });

            EachDesign.forEach(temp => {
                temp.Created_date = moment(temp.Created_date).format('YYYY-MM-DD');
            });
            //

            res.render('searchView', {
                mobile: Mobiles,
                newPost: NewPosts,
                eachMobile: EachMobile[0],
                eachLaptop: EachLaptop[0],
                eachAI: EachAI[0],
                eachCamera: EachCamera[0],
                eachDesign: EachDesign[0],
            });
        }).catch(next);
})

module.exports = router;