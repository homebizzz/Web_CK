var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home');
});


app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
})