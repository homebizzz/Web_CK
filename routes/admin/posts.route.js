var express = require('express');
var postsModel = require('../../models/admin/posts.model');
var catsModel = require('../../models/admin/categories.model');
var tagsModel = require('../../models/admin/tags.model')
var moment = require('moment');

var router = express.Router();

router.get('/:status', (req, res, next) => {
    if(res.locals.authUser)
    {   
        if(res.locals.authUser.Permission === 1){
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
                    article.news_cr_date = moment(article.news_cr_date).format('YYYY-MM-DD');
                    article.news_pb_date = moment(article.news_pb_date).format('YYYY-MM-DD');
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
        }
        else{
            res.end('Quyen truy cap khong hop le');
        }
    }
    else{
        res.redirect('/account/sign-in-up');
    }
})

router.get('/edit/post/:id', (req, res, next) =>{
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('admin/posts/admin-posts-edit', {
        error: true,
        layout: false
      });
    }

    Promise.all([postsModel.singleForEdit(id),
                catsModel.allofCatSon(),
                tagsModel.all()
    ]).then(([rows, cats, tags]) => {
        if(rows[0].status === 1){ 
            isRefuse = false;
            isDraft = false;
            isPublished = true;
            isWait = false;
        }else if(rows[0].status === 2){
            isRefuse = false;
            isDraft = false;
            isPublished = false;
            isWait = true;
        }else if(rows[0].status === 3){
            isRefuse = false;
            isDraft = true;
            isPublished = false;
            isWait = false;
        }else{
            isRefuse = true;
            isDraft = false;
            isPublished = false;
            isWait = false;
        }

        Promise.all([catsModel.singleOfCatSon(rows[0].CategorySon_id),
                    tagsModel.single(rows[0].tag1),
                    tagsModel.single(rows[0].tag2)
                    ]).then(([catSon, tag1, tag2]) => {
                          if (rows.length > 0) {
                            res.render('admin/posts/admin-posts-edit', {
                              error: false,
                              layout: false,
                              post: rows[0],
                              categories: cats,
                              tags,
                              catName: catSon[0].NameSon,
                              tagName1: tag1[0].Name,
                              tagName2: tag2[0].Name,
                              isRefuse,
                              isDraft,
                              isPublished,
                              isWait
                            });
                          } else {
                            res.render('admin/posts/admin-posts-edit', {
                              error: true,
                              layout: false
                            });
                          }
                        }).catch(next);
                    })
})

router.post('/update/:status', (req, res, next) => {
    var status = req.params.status;
    postsModel.update(req.body).then(n => {
        if(status === 'published'){
            res.redirect('/admin-posts/published');
        }else if(status === 'wait'){
           res.redirect('/admin-posts/wait');
        }else if(status === 'draft'){
            res.redirect('/admin-posts/draft');
        }else{
            res.redirect('/admin-posts/refuse');
        }
    }).catch(next);
})

router.post('/delete/:status', (req, res, next) => {
    var status = req.params.status;
    postsModel.delete(req.body.Id).then(n => {
        if(status === 'published'){
            res.redirect('/admin-posts/published');
        }else if(status === 'wait'){
           res.redirect('/admin-posts/wait');
        }else if(status === 'draft'){
            res.redirect('/admin-posts/draft');
        }else{
            res.redirect('/admin-posts/refuse');
        }
    }).catch(next);
})

router.post('/publish/:id', (req, res, next) => {
    var id = req.params.id;
    var currentDay = moment().format('YYYY-MM-DD');

    postsModel.publish(id, currentDay).then(n => {
        res.redirect('/admin-posts/published');
    }).catch(next);
})

module.exports = router;