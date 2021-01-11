let express = require('express');
let router = express.Router();

let mysql = require('mysql');

let con = mysql.createPool({
    host: 'localhost',
    user: 'mysql',
    password: 'mysql',
    database: 'market'
});


router.get('/', function (req, res) {
    console.log(req.query.id);
    let catId = req.query.id;
  
    let cat = new Promise(function(resolve, reject){
      con.query(
        'SELECT * FROM category WHERE id='+catId,
        function(error, result){
          if (error) reject(error);
          resolve(result);
        });
    });

    let goods = new Promise(function(resolve, reject){
      con.query(
        'SELECT * FROM prod WHERE category='+catId,
        function(error, result){
          if (error) reject(error);
          resolve(result);
        });
    });

    // let products = new Promise(function(resolve, reject) {
    //     con.query(
    //         'SELECT * FROM prod',  // my sql запрос в бд
    //         function(error, result) {
    //             if (error) reject(error)
                
    //             //  
    //         });
    // });
  
    Promise.all([cat, goods])
        .then(function(value){ v
            res.render('products', {
                cat: JSON.parse(JSON.stringify(value[0])),
                goods: JSON.parse(JSON.stringify(value[1]))
              });
        });

});

module.exports = router;