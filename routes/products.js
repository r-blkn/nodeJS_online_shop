let express = require('express');
let router = express.Router();

let mysql = require('mysql');

let con = mysql.createPool({
    host: 'localhost',
    user: 'mysql',
    password: 'mysql',
    database: 'market'
});


// Products page
router.get('/', function (req, res) {
    console.log('/products');
 
    con.query(
     'SELECT * FROM prod',  // my sql запрос в бд
     function(error, result) {
         if (error) throw(error)
         
         // console.log(JSON.parse(JSON.stringify(result)));
 
         let goods = {};
         for (let i = 0; i < result.length; i++){
             goods[result[i]['id']] = result[i];
         }
        //  console.log(JSON.parse(JSON.stringify(goods)));
         console.log(JSON.parse(JSON.stringify(result.id)));
         res.render('products', {
             title: 'Віко Банзай товари',
             goods: JSON.parse(JSON.stringify(result))
         });
     });

});


module.exports = router;
