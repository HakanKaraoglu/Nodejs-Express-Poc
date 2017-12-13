const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//Partial Views
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//Helper Function
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//Middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}-${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

//Service
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

//Server Port
app.listen('3000', () => {
    console.log('Server is up on port 3000');
});