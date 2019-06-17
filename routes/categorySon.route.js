var express = require('express');
var newspaperModel = require('../models/categorySon.model');
var moment = require('moment');

var router = express.Router();

router.get('/:idSon', (req, res, next) => {
    let id = req.params.idSon;
    console.log('1111', id, '22222');
    Promise.all([
        newspaperModel.allByCategory(id),
        newspaperModel.allByNewPost(),
        newspaperModel.allByNewEach("Mobile"),
        newspaperModel.allByNewEach("Laptop"),
        newspaperModel.allByNewEach("AI"),
        newspaperModel.allByNewEach("Camera"),
        newspaperModel.allByNewEach("Design"),

        ]).then(([Mobiles, NewPosts, EachMobile, EachLaptop, EachAI, EachCamera, EachDesign]) => {
            Mobiles.forEach(mobile => {
                mobile.Created_date = moment().format('YYYY-MM-DD');
            });
            // console.log('111111');
            // console.log(cat);
            // console.log('111111');
            console.log(Mobiles[0]);

            NewPosts.forEach(newPost => {
                newPost.Created_date = moment().format('YYYY-MM-DD');
            });
            //
            EachMobile.forEach(temp => {
                temp.Created_date = moment().format('YYYY-MM-DD');
            });

            EachLaptop.forEach(temp => {
                temp.Created_date = moment().format('YYYY-MM-DD');
            });

            EachAI.forEach(temp => {
                temp.Created_date = moment().format('YYYY-MM-DD');
            });

            EachCamera.forEach(temp => {
                temp.Created_date = moment().format('YYYY-MM-DD');
            });

            EachDesign.forEach(temp => {
                temp.Created_date = moment().format('YYYY-MM-DD');
            });
            //
            res.render('categoriesSon', {
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
                detail.Created_date = moment().format('YYYY-MM-DD');
            });

            Category.forEach(categories => {
                categories.Created_date = moment().format('YYYY-MM-DD');
            });

            NewPosts.forEach(newPost => {
                newPost.Created_date = moment().format('YYYY-MM-DD');
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