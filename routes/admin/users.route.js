var express = require('express');
var userModel = require('../../models/admin/users.model');
var categoryModel = require('../../models/admin/categories.model');
var moment = require('moment');
var router = express.Router();

router.get('/:permission', (req, res, next) => {
  var permission = req.params.permission;
  var id = req.params.id;

  var page = req.query.page || 1;
  if (page < 1) page = 1;

  var limit = 6;
  var offset = (page - 1) * limit;

  if(permission === 'admin'){
    isAdmin = true;
    isEditor = false;
    isWriter = false;
    isSubscriber = false;
  }else if(permission === 'editor'){
    isEditor = true;
    isAdmin = false;
    isWriter = false;
    isSubscriber = false;
  }else if(permission === 'writer'){
    isWriter = true;
    isAdmin = false;
    isEditor = false;
    isSubscriber = false;
  }else{
    isSubscriber = true;
    isAdmin = false;
    isEditor = false;
    isWriter = false;
  }

  Promise.all([
    userModel.pageByPermission(permission, limit, offset),
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

    rows.forEach(user => {
      user.Subscribe_date = moment(user.Subscribe_date).format('YYYY-MM-DD');
    });
    
    res.render('admin/users/admin-users', {
      layout: false,
      users: rows,
      pages,
      isAdmin,
      isEditor,
      isSubscriber,
      isWriter
    });
  }).catch(next);
})

router.get('/add/user', (req, res) => {
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
  
router.post('/add/user', (req, res) => {
  userModel.add(req.body).then(id => {
    res.redirect('/admin-users/admin');
  }).catch(err => {
    console.log(err);
    res.end('error occured.')
  });
})

router.post('/renew/:id', (req, res) => {
  var id = req.params.id;
  userModel.singleForRenew(id).then(rows => {
    newDate = rows[0].Subscribe_date;
    newDate = moment(moment(newDate).add(7, 'd')).format('YYYY-MM-DD');
    userModel.renew(id, newDate).then(p => {
      res.redirect('/admin-users/subscriber');
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
  })
})

router.get('/edit/:permission/:id', (req, res) =>{
  var permission = req.params.permission;
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('admin/users/admin-users-edit', {
      error: true,
      layout: false
    });
  }

  if(permission === 'Admin'){
    isAdmin = true;
    isEditor = false;
    isWriter = false;
    isSubscriber = false;
  }else if(permission === 'Editor'){
    isEditor = true;
    isAdmin = false;
    isWriter = false;
    isSubscriber = false;
  }else if(permission === 'Writer'){
    isWriter = true;
    isAdmin = false;
    isEditor = false;
    isSubscriber = false;
  }else{
    isSubscriber = true;
    isAdmin = false;
    isEditor = false;
    isWriter = false;
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
        res.redirect('/admin-users/admin');
    }).catch(err => {
        console.log(err);
        res.end('error occured.')
    });
})

module.exports = router;