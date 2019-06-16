var express = require('express');
var userModel = require('../../models/admin/users.model');
var categoryModel = require('../../models/admin/categories.model')
var router = express.Router();

router.get('/', (req, res, next) => {
    var id = req.params.id;
  var page = req.query.page || 1;
  if (page < 1) page = 1;

  var limit = 6;
  var offset = (page - 1) * limit;

  Promise.all([
    userModel.pageByUser(limit, offset),
    userModel.countByUser(),
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

    res.render('admin/users/admin-users', {
      layout: false,
      users: rows,
      pages
    });
  }).catch(next);
})

router.get('/add', (req, res) => {
    Promise.all([categoryModel.all(),
                userModel.allOfPermission()
                ]).then(([cats, pers]) => {
                    res.render('admin/users/admin-users-add', {
                    error: false,
                    layout: false,
                    categories: cats,
                    permissions: pers,
                    });
                }).catch(err => {
                    console.log(err);
                    res.end('error occured.')
                });
})
  
  router.post('/add', (req, res) => {
    userModel.add(req.body).then(id => {
      res.redirect('/admin-users');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })

router.get('/edit/:id', (req, res) =>{
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('admin/users/admin-users-edit', {
        error: true,
        layout: false
      });
    }
    Promise.all([userModel.single(id),
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
        });
      } else {
        res.render('admin/users/admin-users-edit', {
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
    userModel.update(req.body).then(n => {
      res.redirect('/admin-users');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})
  
router.post('/delete', (req, res) => {
    userModel.delete(req.body.Id).then(n => {
        res.redirect('/admin-users');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

module.exports = router;