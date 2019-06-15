var express = require('express');
var categoryModel = require('../../models/admin/categories.model');

var router = express.Router();

router.get('/', (req, res) => {
    var p = categoryModel.all();

    p.then(rows => {
        res.render('admin/categories/admin-categories', {
            layout: false,
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });
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