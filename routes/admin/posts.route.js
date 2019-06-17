var express = require('express');
var postsModel = require('../../models/admin/posts.model');
var moment = require('moment');

var router = express.Router();

// router.get('/', (req, res, next) => {
//     var id = req.params.id;
//     var page = req.query.page || 1;
//     if (page < 1) page = 1;

//     var limit = 6;
//     var offset = (page - 1) * limit;

//     Promise.all([
//         postsModel.pageByPost(limit, offset),
//         postsModel.countByPost(),
//     ]).then(([rows, count_rows]) => {
//         // for (const c of res.locals.lcCategories) {
//         //   if (c.Id === +id) {
//         //     c.isActive = true;
//         //   }
//         // }
//         rows.forEach(article => {
//             article.news_cr_date = moment().format('YYYY-MM-DD');
//         });    

//         var total = count_rows[0].total;
//         var nPages = Math.floor(total / limit);
//         if (total % limit > 0) nPages++;
//         var pages = [];
//         for (i = 1; i <= nPages; i++) {
//         var obj = { value: i, active: i === +page };
//         pages.push(obj);
//         }

//         res.render('admin/posts/admin-posts', {
//         layout: false,
//         posts: rows,
//         pages
//         });
//     }).catch(next);
// })

router.get('/:status', (req, res, next) => {
    var status = req.params.status;
    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 6;
    var offset = (page - 1) * limit;

    if(status === 'refuse'){ 
        // bi tu choi
        isRefuse = true;
        isDraft = false;
        isPublished = false;
        isWait = false;
    }else if(status === 'draft'){ 
        // dang cho duyet
        isRefuse = false;
        isDraft = true;
        isPublished = false;
        isWait = false;
    }else if(status === 'published'){
        // da xuat ban
        isRefuse = false;
        isDraft = false;
        isPublished = true;
        isWait = false;
    }else{
        // da duyet va choi xuat ban
        isRefuse = false;
        isDraft = false;
        isPublished = false;
        isWait = true;
    }

    Promise.all([
        postsModel.pageByStatus(status, limit, offset),
        postsModel.countByPost(status),
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
        isRefuse,
        isDraft,
        isPublished,
        isWait
        });
    }).catch(next);
})

router.get('/edit/:id', (req, res, next) =>{
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('admin/posts/admin-posts-edit', {
        error: true,
        layout: false
      });
    }

    Promise.all([userModel.singleByPermission(permission, id),
                categoryModel.all(),
                userModel.allOfPermission()
    ]).then(([rows, cats, pers]) => {
      if (rows.length > 0) {
        res.render('admin/users/admin-users-edit', {
          error: false,
          layout: false,
          user: rows[0],
          categories: cats,
          permissions: pers,
          isAdmin,
          isEditor,
          isSubscriber,
          isWriter
        });
      } else {
        res.render('admin/users/admin-users-edit', {
          error: true,
          layout: false
        });
      }
    }).catch(next);
  })

module.exports = router;