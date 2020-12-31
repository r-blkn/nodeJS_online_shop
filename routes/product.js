let express = require('express');
let router = express.Router();



let mysql = require('mysql');


let con = mysql.createPool({
    host: 'localhost',
    user: 'mysql',
    password: 'mysql',
    database: 'market'
});

/* GET home page. */
router.get('/', function(req, res, next) {  
  console.log('req.query.id');
  con.query(
    'SELECT * FROM prod WHERE id=' + req.query.id,
    function (error, result, fields) {
      if (error) throw error;

      res.render('product', {
        goods: result
      });
    });  
});

module.exports = router;
