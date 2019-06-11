var express = require('express');
var exphbs = require('express-handlebars');
var hbs_sections = require('express-handlebars-sections');

var app = express();
app.use(express.urlencoded());
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
app.use('/sign-in-up', require('./routes/account.route'));

app.get('/forgotPassword', (req, res) => {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainSign.hbs',
        layoutsDir: 'views/_layouts',
        helpers:{
            section: hbs_sections()
        }
    }));
    res.render('Login-out/forgotPassword');
})

app.get('/inputOTP', (req, res) => {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainSign.hbs',
        layoutsDir: 'views/_layouts',
        helpers:{
            section: hbs_sections()
        }
    }));
    res.render('Login-out/inputOTP');
})


//
app.get('/dashboard', (req, res)=> {
    // app.engine('hbs', exphbs({
    //     defaultLayout: 'mainAdmin.hbs',
    //     layoutsDir: 'views/_layouts'
    // }));
    res.render('admin/admin-user');
})

app.get('/admin-posts', (req, res)=> {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainAdmin.hbs',
        layoutsDir: 'views/_layouts'
    }));
    res.render('admin/admin-posts');
})

app.use('/admin-categories', require('./routes/admin/categories.route'));
app.get('/admin-categories', (req, res) => {
    res.render('admin/admin-categories', {layout: false});
})

app.use('/admin-tags', require('./routes/admin/categories.route'));
// app.get('/admin-tags', (req, res)=> {
//     res.render('admin/admin-tags', {layout: false});
// })

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
    res.render('BTV/BTV-post');
})

//////////
app.use('/writer', require('./routes/writer/upload.route'));


app.get('/Writer-detail', (req, res)=> {
    app.engine('hbs', exphbs({
        defaultLayout: 'mainAdmin.hbs',
        layoutsDir: 'views/_layouts'
    }));
    res.render('Writer/Writer-detail');
})

app.listen(3000, () => {
    console.log('Web Server is running at http://localhost:3000');
})