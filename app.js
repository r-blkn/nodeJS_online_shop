let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// -----ROUTERS ------ 
let indexRouter = require('./routes/index');
let aboutRouter = require('./routes/about');
let basketRouter = require('./routes/basket');
let contactsRouter = require('./routes/contacts');
let deliveryRouter = require('./routes/delivery');
let orderingRouter = require('./routes/ordering');
let productRouter = require('./routes/product');
let productsRouter = require('./routes/products');
// -----ROUTERS ------ 

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -----ROUTERS PATH ------ 
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/basket', basketRouter);
app.use('/contacts', contactsRouter);
app.use('/delivery', deliveryRouter);
app.use('/ordering', orderingRouter);
app.use('/product', productRouter);
app.use('/products', productsRouter);
// -----ROUTERS PATH ------

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


