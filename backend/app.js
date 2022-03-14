const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//configuring routes
const indexRouter = require('./routes/index');
const productRouter = require('./routes/productRouter');
const usersRouter = require('./routes/users');
const loginRouter = require("./routes/loginRouter");
const { dir } = require('console');


const expressLayouts = require('express-ejs-layouts');



const app = express();

console.log(`${__filename}../frontend/public`);
// view engine setup
app.set('views', __dirname + '/../frontend/views');
app.set('view engine', 'ejs');
app.set('layout', 'layout/layout');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/../frontend/public'));
app.use('/css', express.static(__dirname + '/../frontend/public/css'));
app.use('/js', express.static(__dirname + '/../frontend/public/js'));
app.use('/img', express.static(__dirname + '/../frontend/public/img'));
app.use('/uploads', express.static(__dirname + '/../frontend/public/uploads'));
app.use(expressLayouts)



app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/users', usersRouter);
app.use("/login", loginRouter);

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
