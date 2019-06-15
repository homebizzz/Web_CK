var express = require('express');
var tagModel = require('../../models/admin/tags.model');

var router = express.Router();

router.get('/', (req, res) => {
    var p = tagModel.all();

    p.then(rows => {
        res.render('admin/tags/admin-tags', {
            layout: false,
            tags: rows
        });
    }).catch(err => {
        console.log(err);
    });
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