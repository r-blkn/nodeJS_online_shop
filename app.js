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
// let categoryRouter = require('./routes/category');
// let categoryRouter = require('./routes/category-list');
// -----ROUTERS ------ 

let app = express();


app.listen(80);

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
// app.use('/products-cat', categoryRouter);
// -----ROUTERS PATH ------

app.post('/get-category-list', function (req, res) {
  // console.log(req.body);
  con.query(
    'SELECT id, category  FROM category',
    function (error, result, fields) {
      if (error) throw error;
      console.log('RESULT:::::::', result);

      console.log('RESULT:', result);
      res.json(result);
  });

});

app.post('/get-goods-info', function (req, res) {
  console.log(req.body.key);
  if (req.body.key.length != 0) {
    con.query('SELECT * FROM prod WHERE id IN ('+req.body.key.join(',')+')',
      function (error, result, fields) {
        if (error) throw error;
  
        let goods = {};
  
        for (let i = 0; i < result.length; i++) {
          goods[result[i]['id']] = result[i];
        }
        res.json(goods);
    });
  } 
  else {
    res.send('0');
  }

});


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