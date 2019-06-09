var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts'
}))

app.set('view engine', 'hbs');
//
app.use(express.static('assets'));
//
app.get('/', (req, res) => {
    //res.render('index');
    res.render('test')
})

app.use('/test', require('./routes/news.route'));

// app.get('/categories', (req, res) => {
//     res.render('categories');
// })

app.listen(3000, () => {
    console.log('Web Server is running at http://localhost:3000');
})