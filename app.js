var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'jkf;dsau9few',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {

    if(!request.session.number) {
        request.session.number = Math.floor(Math.random() * 100) + 1;
    }
    
    response.render('index', {
        number: request.session.number,
        res: request.session.res,
        win: request.session.win
    });
})

app.post('/process', function(request, response) {
    if(request.body.guess > request.session.number) {
        console.log("Too High.");
        request.session.res = "Too High";
        request.session.win = false;
    } else if (request.body.guess < request.session.number) {
        console.log("Too Low.");
        request.session.res = "Too Low";
        request.session.win = false;
    } else {
        console.log("You guessed it!");
        request.session.res = "You guessed it!";
        request.session.win = true;
    }

    response.redirect('/');
})

app.get('/reset', function(request, response) {
    request.session.destroy();
    response.redirect('/');
})





app.listen(8000, function() {
    console.log("listening on port 8000");
})