var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);


// Bringing in Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bottomsRouter = require('./routes/bottomsRouter');
const hatsRouter = require('./routes/hatsRouter');
const shoesRouter = require('./routes/shoesRouter');
const topsRouter = require('./routes/topsRouter');


//  Connecting Mongoose
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/projectx';
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
connect
  .then(() => console.log('Connected correctly to server'),
    err => console.log(err)
  );
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  name: 'session-id',
  secret: '12345-54321-12345-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

// This snipet tracks cookies 
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Basic authentication 
function auth(req, res, next) {
  console.log(req.session);

  if (!req.session.user) {
      const err = new Error('You are not authenticated!');
      err.status = 401;
      return next(err);
  } else {
    if (req.session.user === 'authenticated') { // authentication connected
      return next();
    } else {
      const err = new Error('You are not authenticated!');
      err.status = 401;
      return next(err);
    }
  }
}
app.use(auth);
// Browser authentication end.


app.use(express.static(path.join(__dirname, 'public')));


// Using in Routers
app.use('/bottoms', bottomsRouter);
app.use('/hats', hatsRouter);
app.use('/shoes', shoesRouter);
app.use('/tops', topsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
