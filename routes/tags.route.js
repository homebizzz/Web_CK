var express = require('express');
var newspaperModel = require('../models/tags.model');
var moment = require('moment');

var router = express.Router();

router.get('/:tagName', (req, res, next) => {
    let tagN = req.params.tagName;
    Promise.all([
        newspaperModel.allByTag(tagN),
        newspaperModel.allByNewPost(),
        newspaperModel.allByNewEach("Mobile"),
        newspaperModel.allByNewEach("Laptop"),
        newspaperModel.allByNewEach("AI"),
        newspaperModel.allByNewEach("Camera"),
        newspaperModel.allByNewEach("Design"),

        ]).then(([Tags, NewPosts, EachMobile, EachLaptop, EachAI, EachCamera, EachDesign]) => {
            Tags.forEach(tag => {
                tag.Created_date = moment(tag.Created_date).format('YYYY-MM-DD');
            });

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
            res.render('tags', {
                tagName: tagN,
                tag: Tags,
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