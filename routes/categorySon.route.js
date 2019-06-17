var express = require('express');
var newspaperModel = require('../models/categorySon.model');
var moment = require('moment');

var router = express.Router();

router.get('/:idSon', (req, res, next) => {
    let id = req.params.idSon;

// phan trang
    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 3;
    var offset = (page - 1) * limit;
//  

    Promise.all([
        newspaperModel.allByCategorySon(id, limit, offset),
        newspaperModel.allByNewPost(),
        newspaperModel.allByNewEach("Mobile"),
        newspaperModel.allByNewEach("Laptop"),
        newspaperModel.allByNewEach("AI"),
        newspaperModel.allByNewEach("Camera"),
        newspaperModel.allByNewEach("Design"),
        newspaperModel.countRowByIdSon(id),

        ]).then(([Mobiles, NewPosts, EachMobile, EachLaptop, EachAI, EachCamera, EachDesign, count_rows]) => {

        // phan trang
            var total = count_rows[0].total;
            var nPages = Math.floor(total / limit);
            if (total % limit > 0) nPages++;
            var pages = [];
            for (i = 1; i <= nPages; i++) {
            var obj = { value: i, active: i === +page };
            pages.push(obj);
            }
        //


            Mobiles.forEach(mobile => {
                mobile.Created_date = moment().format('YYYY-MM-DD');
            });

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
                pages
            });
        }).catch(next);
})

module.exports = router;