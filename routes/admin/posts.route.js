var express = require('express');
var postsModel = require('../../models/admin/posts.model');
var moment = require('moment');

var router = express.Router();

router.get('/', (req, res, next) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 6;
    var offset = (page - 1) * limit;

    Promise.all([
        postsModel.pageByPost(limit, offset),
        postsModel.countByPost(),
    ]).then(([rows, count_rows]) => {
        // for (const c of res.locals.lcCategories) {
        //   if (c.Id === +id) {
        //     c.isActive = true;
        //   }
        // }
        rows.forEach(article => {
            article.news_cr_date = moment().format('YYYY-MM-DD');
        });    

        var total = count_rows[0].total;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
        }

        res.render('admin/posts/admin-posts', {
        layout: false,
        posts: rows,
        pages
        });
    }).catch(next);
})

router.get('/Draft', (req, res, next) => {
    var id = req.params.id;
    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 6;
    var offset = (page - 1) * limit;

    Promise.all([
        postsModel.pageByPostIsDraft(limit, offset),
        postsModel.countByPost(),
    ]).then(([rows, count_rows]) => {
        // for (const c of res.locals.lcCategories) {
        //   if (c.Id === +id) {
        //     c.isActive = true;
        //   }
        // }
        rows.forEach(article => {
            article.news_cr_date = moment().format('YYYY-MM-DD');
        });    

        var total = count_rows[0].total;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++) {
        var obj = { value: i, active: i === +page };
        pages.push(obj);
        }

        res.render('admin/posts/admin-posts', {
        layout: false,
        posts: rows,
        pages,
        isDraft: true
        });
    }).catch(next);
})

module.exports = router;