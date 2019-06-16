var express = require('express');
var categoryModel = require('../../models/admin/categories.model');

var router = express.Router();

router.get('/', (req, res, next) => {
  var id = req.params.id;
  var page = req.query.page || 1;
  if (page < 1) page = 1;

  var limit = 6;
  var offset = (page - 1) * limit;

  Promise.all([
    categoryModel.pageByCat(limit, offset),
    categoryModel.countByCat(),
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

    res.render('admin/categories/admin-categories', {
      layout: false,
      categories: rows,
      pages
    });
  }).catch(next);
})

router.get('/add', (req, res) => {
  res.render('admin/categories/admin-categories-add',{
    layout: false,
  });
})

router.post('/add', (req, res) => {
  categoryModel.add(req.body).then(id => {
    res.redirect('/admin-categories');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.get('/edit/:id', (req, res) =>{
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('admin/categories/admin-categories-edit', {
        error: true,
        layout: false
      });
    }
  
    categoryModel.single(id).then(rows => {
      if (rows.length > 0) {
        res.render('admin/categories/admin-categories-edit', {
          error: false,
          layout: false,
          category: rows[0]
        });
      } else {
        res.render('admin/categories/admin-categories-edit', {
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
  categoryModel.update(req.body).then(n => {
    res.redirect('/admin-categories');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/delete', (req, res) => {
  categoryModel.delete(req.body.Id).then(n => {
    res.redirect('/admin-categories');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

module.exports = router;