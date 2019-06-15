var express = require('express');
var categoryModel = require('../../models/admin/categories.model');

var router = express.Router();

router.get('/', (req, res) => {
    var p = categoryModel.all();

    p.then(rows => {
        res.render('admin/admin-categories', {
            layout: false,
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/edit/:id', (req, res) =>{
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('admin/admin-categories-edit', {
        error: true,
        layout: false
      });
    }
  
    categoryModel.single(id).then(rows => {
      if (rows.length > 0) {
        res.render('admin/admin-categories-edit', {
          error: false,
          layout: false,
          category: rows[0]
        });
      } else {
        res.render('admin/admin-categories-edit', {
          error: true,
          layout: false
        });
      }
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

module.exports = router;