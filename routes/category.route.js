var express = require('express');
var newspaperModel = require('../models/category.model');
var moment = require('moment');

var router = express.Router();

router.get('/:catname', (req, res, next) => {
    let cat = req.params.catname;
    Promise.all([
        newspaperModel.allByCategory(cat),
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
            res.render('categories', {
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

router.get('/:catname/:id', (req, res, next) =>{
    let cat = req.params.catname;
    let id = req.params.id;
    console.log(id);
    Promise.all([
        newspaperModel.loadDetail(id),
        newspaperModel.allByCategory(cat),
        newspaperModel.allByNewPost(),
        newspaperModel.allByNewEach("Mobile"),
        newspaperModel.allByNewEach("Laptop"),
        newspaperModel.allByNewEach("AI"),
        newspaperModel.allByNewEach("Camera"),
        newspaperModel.allByNewEach("Design"),

        ]).then(([Detail, Category, NewPosts, EachMobile, EachLaptop, EachAI, EachCamera, EachDesign]) => {

            Detail.forEach(detail => {
                detail.Created_date = moment(detail.Created_date).format('YYYY-MM-DD');
            });

            Category.forEach(categories => {
                categories.Created_date = moment(categories.Created_date).format('YYYY-MM-DD');
            });

            NewPosts.forEach(newPost => {
                newPost.Created_date = moment(newPost.Created_date).format('YYYY-MM-DD');
            });

            res.render('detail', {
                detail: Detail[0],
                category1: Category[0],
                category2: Category[1],
                category3: Category[2],
                category4: Category[3],
                category5: Category[4],
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