var createError = require('http-errors');
var express = require('express');
var formidableMiddleware = require('express-formidable');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var cors = require('cors');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var dhruRouter = require('./routes/dhru');

var app = express();
/**
 * CORS
 */
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// remove default powered by on header
app.disable('x-powered-by');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(formidableMiddleware());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(bodyParser.json({ limit: '50MB' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50MB' }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use('/api/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/dhru', dhruRouter);

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
