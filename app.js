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
// let categoryRouter = require('./routes/category-list');
// -----ROUTERS ------ 

let app = express();

let mysql = require('mysql');

let con = mysql.createPool({
    host: 'localhost',
    user: 'mysql',
    password: 'mysql',
    database: 'market'
});

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
app.use('/goods', productRouter);
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




// app.post('/get-category-list', function (req, res) {
//   // console.log(req.body);
//   con.query(
//     'SELECT * FROM category',
//     function (error, result, fields) {
//       if (error) throw error;

//       console.log('RESULT:', result);
//       res.json(result);
//   });

// });

app.post('/get-goods-info', function (req, res) {
  console.log(req.body);
  // con.query(
  //   'SELECT id, category FROM category',
  //   function (error, result, fields) {
  //     if (error) throw error;

  //     console.log('RESULT:', result);
  //     res.json(result);
  // });

});

module.exports = app;