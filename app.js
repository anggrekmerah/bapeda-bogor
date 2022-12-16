var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groupRouter = require('./routes/group');
var menuRouter = require('./routes/menu');
var group_menuRouter = require('./routes/group_menu');
var sitemapRouter = require('./routes/sitemap');

var phone_bookRouter = require('./routes/phone_book');
var black_listRouter = require('./routes/black_list');
var extensionRouter = require('./routes/extension');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/group', groupRouter);
app.use('/menu', menuRouter);
app.use('/group-menu', group_menuRouter);
app.use('/sitemap', sitemapRouter);
app.use('/phone-book', phone_bookRouter);
app.use('/black-list', black_listRouter);
app.use('/extension', extensionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
