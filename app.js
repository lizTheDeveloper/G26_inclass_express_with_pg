var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pg = require('pg');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var db = require('./db')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/pokemon", function (req, res, next) {
  db.query("SELECT * FROM pokemon;", function (err, result) {
    res.render("index", {pokemon: result.rows, title: "All the pokemon"});
  });
});

app.post("/pokemon", function (req, res, next) {
  console.log(req.body);

  db.query("INSERT INTO pokemon (name, pokedex_number, type1, type2) VALUES ($1, $2, $3, $4);",
  [req.body.name, req.body.pokedex_number, req.body.type1, req.body.type2],
  function(err, result){
    console.log(err);
    res.send(result);
  })
})




app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;