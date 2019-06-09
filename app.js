var express = require('express');
var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');
var app = express();
var app1 = express();

app1.engine('hbs', exphbs({
    defaultLayout: 'mainSign.hbs',
    layoutsDir: 'views/_layouts',
    helpers:{
        section: hbs_sections()
    }
}))
app1.set('view engine', 'hbs');

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    helpers:{
        section: hbs_sections()
    }
}))

app.set('view engine', 'hbs');
//
app.use(express.static('assets'));
app.use(express.static('assset1'));
app.use(express.static('ckeditor'));

app.use('/', require('./routes/news.route'));

// trang chu
app.get('/', (req, res) => {
    res.render('index');
})

// chuyen muc
app.get('/categories', (req, res) => {
    res.render('categories');
})

// chi tiet 1 bai viet
app.get('/detail', (req, res) => {
    res.render('detail');
})

// trang chu cua subcriber co dki
app.get('/subcriber', (req, res) => {
    res.render('indexSubcriber');
})


//log in
app.get('/sign-in-up', (req, res) => {
    res.render('sign-in-up');
})

//
app.get('/dashboard', (req, res)=> {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainAdmin.hbs',
        layoutsDir: 'views/_layouts'
    }));
    res.render('admin-user');
})

app.get('/admin-posts', (req, res)=> {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainAdmin.hbs',
        layoutsDir: 'views/_layouts'
    }));
    res.render('admin-posts');
})

app.get('/admin-categories', (req, res)=> {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainAdmin.hbs',
        layoutsDir: 'views/_layouts'
    }));
    res.render('admin-categories');
})

app.get('/admin-tags', (req, res)=> {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainAdmin.hbs',
        layoutsDir: 'views/_layouts'
    }));
    res.render('admin-tags');
})

app.get('/profile', (req, res)=> {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainAdmin.hbs',
        layoutsDir: 'views/_layouts'
    }));
    res.render('profile');
})

app.get('/BTV-post', (req, res)=> {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainAdmin.hbs',
        layoutsDir: 'views/_layouts'
    }));
    res.render('BTV-post');
})

app.get('/Writer-posts', (req, res)=> {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainAdmin.hbs',
        layoutsDir: 'views/_layouts'
    }));
    res.render('Writer-posts');
})

app.get('/Writer-detail', (req, res)=> {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainAdmin.hbs',
        layoutsDir: 'views/_layouts'
    }));
    res.render('Writer-detail');
})

app.listen(3000, () => {
    console.log('Web Server is running at http://localhost:3000');
})