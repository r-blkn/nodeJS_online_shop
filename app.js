let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const nodemailer = require('nodemailer');

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

// let con = mysql.createPool({
//     host: 'localhost',
//     user: 'mysql',
//     password: 'mysql',
//     database: 'market'
// });
let con = mysql.createPool({
  host: 'localhost',
  user: 'a0500445_viko',
  password: 'ak3NCcmv',
  database: 'a0500445_market'
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

app.post('/finish-order', function (req, res) {
  console.log(req.body);
  if (req.body.key.length !=0) {
    let key = Object.key(req.body.key);
    con.query(
      'SELECT * FROM prod WHERE id IN (' + key.join(',') + ')', 
      function (error, result, fields) {
      if (error) throw error;

      console.log(error);
      console.log("SEND!!!!!!");

      sendMail(req.body, result).catch(console.error);

      saveOrder(req.body, result);
      res.send('1');
    });
  } else {
    console.log('SOMETHING WRROOOOONG!');
    res.send('0');
  }
  
});

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
    con.query(
      'SELECT * FROM prod WHERE id IN ('+req.body.key.join(',')+')',
      function (error, result, fields) {
        if (error) throw error;
        
        let goods = {};
  
        for (let i = 0; i < result.length; i++){
          goods[result[i]['id']] = result[i];
        }
  
        res.json(goods);
    });
  } else {
    res.send('0');
  }
  
});

function saveOrder(data, result) {
  let sql;
  sql = "INSERT INTO user_info (user_name, user_phone, user_email,address) VALUES ('" + data.username + "', '" + data.phone + "', '" + data.email + "','" + data.address + "')";
  
  con.query(sql, function (error, result) {
    if (error) throw error;
    console.log("1 user record inserted");
  });

  date = new Date() / 1000;
  for (let i = 0; i < result.length; i++) {
    sql = "INSERT INTO shop_order (date, user_id, goods_id, goods_cost, goods_amount, total) VALUES (" + date + ", 45," + result[i]['id'] + ", " + result[i]['cost'] + "," + data.key[result[i]['id']] + ", " + data.key[result[i]['id']] * result[i]['cost'] + ")";
    console.log(sql);
    con.query(sql, function (error, result) {
      if (error) throw error;
      console.log("1 record inserted");
    });
  }
}

async function sendMail(data, result) {
  let res = '<h2>Замовлення Віко Банзай: </h2>';
  let total = 0;

  for (let i = 0; i < result.length; i++) {
    res += `<p>${result[i]['name']} - ${data.key[result[i]['id']]} - ${result[i]['price'] * data.key[result[i]['id']]} uah</p>`;
    total += result[i]['price'] * data.key[result[i]['id']];
  }

  console.log(res);

  res += '<hr>';
  res += `Total ${total} uah`;
  res += `<hr>Ім'я: ${data.username}`;
  res += `<hr>Прізвище: ${data.usersurname}`;
  res += `<hr>Емейл: ${data.mail}`;
  res += `<hr>Телефон: ${data.phone}`;
  res += `<hr>Адресса Nova: ${data.nova}`;
  res += `<hr>Адресса Ukr: ${data.ukr}`;
  

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  let mailOption = {
    from: '<vikobanzayinfo@gmail.com>',
    to: "vikobanzayinfo@gmail.com," + data.email,
    subject: "Віко Банзай",
    text: 'Нове замовлення',
    html: res
  };

  let info = await transporter.sendMail(mailOption);
  console.log("MessageSent: %s", info.messageId);
  console.log("PreviewSent: %s", nodemailer.getTestMessageUrl(info));
  return true;

};
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