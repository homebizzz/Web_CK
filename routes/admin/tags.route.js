var express = require('express');
var tagModel = require('../../models/admin/tags.model');

var router = express.Router();

router.get('/', (req, res, next) => {
  if(res.locals.authUser)
  {
    if(res.locals.authUser.Permission === 1){
      var id = req.params.id;
      var page = req.query.page || 1;
      if (page < 1) page = 1;

      var limit = 6;
      var offset = (page - 1) * limit;

      Promise.all([
        tagModel.pageByTag(limit, offset),
        tagModel.countByTag(),
      ]).then(([rows, count_rows]) => {
        // for (const c of res.locals.lcCategories) {
        //   if (c.Id === +id) {
        //     c.isActive = true;
        //   }
        // }

        var total = count_rows[0].total;
        var nPages = Math.floor(total / limit);
        if (total % limit > 0) nPages++;
        var pages = [];
        for (i = 1; i <= nPages; i++) {
          var obj = { value: i, active: i === +page };
          pages.push(obj);
        }

        res.render('admin/tags/admin-tags', {
          layout: false,
          tags: rows,
          pages
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

router.get('/add', (req, res) => {
    res.render('admin/tags/admin-tags-add',{
      layout: false,
    });
})
  
router.post('/add', (req, res) => {
    tagModel.add(req.body).then(id => {
      res.redirect('/admin-tags');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

router.get('/edit/:id', (req, res) =>{
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('admin/tags/admin-tags-edit', {
        error: true,
        layout: false
      });
    }
  
    tagModel.single(id).then(rows => {
      if (rows.length > 0) {
        res.render('admin/tags/admin-tags-edit', {
          error: false,
          layout: false,
          tag: rows[0]
        });
      } else {
        res.render('admin/tags/admin-tags-edit', {
          error: true,
          layout: false
        });
      }
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

router.post('/update', (req, res) => {
  tagModel.update(req.body).then(n => {
    res.redirect('/admin-tags');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/delete', (req, res) => {
  tagModel.delete(req.body.Id).then(n => {
    res.redirect('/admin-tags');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

module.exports = router;