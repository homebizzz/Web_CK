var express = require('express');
var postsModel = require('../../models/editor/posts.model');
var catsModel = require('../../models/admin/categories.model');
var tagsModel = require('../../models/admin/tags.model');
var userModel = require('../../models/user.model');
var moment = require('moment');

var router = express.Router();

router.get('/:status', (req, res, next) => {
    if(res.locals.authUser)
    {   
        if(res.locals.authUser.Permission === 3){
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
                postsModel.pageByStatus(status, limit, offset, res.locals.authUser.IdCategory),
                postsModel.countByPost(status, res.locals.authUser.IdCategory),
                userModel.single(res.locals.authUser.Id),
            ]).then(([rows, count_rows, Users]) => {
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
    
                res.render('Editor/editor-posts', {
                layout: false,
                posts: rows,
                pages,
                isRefuse,
                isDraft,
                isPublished,
                isWait,
                user: Users
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

router.post('/update/:status', (req, res, next) => {
    var status = req.params.status;
    req.body.Publish_date = moment(req.body.Publish_date, 'DD/MM/YYYY').format('YYYY-MM-DD');
    
    postsModel.update(req.body).then(n => {
        if(status === 'published'){
            res.redirect('/editor-posts/published');
        }else if(status === 'wait'){
           res.redirect('/editor-posts/wait');
        }else if(status === 'draft'){
            res.redirect('/editor-posts/draft');
        }else{
            res.redirect('/editor-posts/refuse');
        }
    }).catch(next);
})

router.get('/edit/post/:id', (req, res, next) =>{
    if(res.locals.authUser.Permission==3)
    {
        var id = req.params.id;
    if (isNaN(id)) {
        userModel.single(res.locals.authUser.Id).then(value=>{
            res.render('Editor/editor-posts-edit', {
                error: true,
                layout: false,
                user: value
            });
        })
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
        tagsModel.single(rows[0].tag2),
        userModel.single(res.locals.authUser.Id),
        ]).then(([catSon, tag1, tag2, Users]) => {
                if (rows.length > 0) {
                    rows[0].Publish_date = moment(rows[0].Publish_date).format('DD/MM/YYYY');
                res.render('Editor/editor-posts-edit', {
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
                    isWait,
                    user: Users
                });
                } else {
                res.render('Editor/editor-posts-edit', {
                    error: true,
                    layout: false,
                    user: Users
                });
                }
            }).catch(next);
        })
    }
})

router.post('/wait/:id', (req, res, next) => {
    var id = req.params.id;
    var currentDay = moment().format('YYYY-MM-DD');

    postsModel.wait(id, currentDay).then(n => {
        res.redirect('/editor-posts/wait');
    }).catch(next);
})

router.post('/refuse/:id', (req, res, next) => {
    var id = req.params.id;
    postsModel.refuse(id).then(n => {
        res.redirect('/editor-posts/refuse');
    }).catch(next);
})

module.exports = router;