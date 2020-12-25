let express = require('express');
let app = express();

app.use(express.static('public'));
//  public -где зранятса статика
// шаблонизатор
// 

app.set('view engine', 'pug');

let mysql = require('mysql');

let con = mysql.createPool({
    host: 'localhost',
    user: 'mysql',
    password: 'mysql',
    database: 'market'
});


app.listen(3000, function() {
    console.log('Server listening on 3000...');
})


app.get('/', function(req, res) {
    console.log('load /');
    
    con.query(
        'SELECT * FROM prod',  // my sql запрос в бд
        function(error, result) {
            if (error) throw(error)
            
            console.log(JSON.parse(JSON.stringify(result)));
            
            res.render('index', {
                result: JSON.parse(JSON.stringify(result))
            })
        
        }
    )

    
});

app.get('/products', function (req, res) {
   console.log('/products');

   con.query(
    'SELECT * FROM prod',  // my sql запрос в бд
    function(error, result) {
        if (error) throw(error)
        
        console.log(JSON.parse(JSON.stringify(result)));

        let goods = {};
        for (let i = 0; i < result.length; i++){
            goods[result[i]['id']] = result[i];
        }
        console.log(JSON.parse(JSON.stringify(goods)));
        
        res.render('products', {
            goods: JSON.parse(JSON.stringify(goods))
        })
    
    }
)




});


app.get('/сat', function (req, res) {
    
    console.log(req.query.id);
    let catId = req.query.id;
    res.render('cat', {})
    con.query(
        'SELECT * FROM category WHERE id='+catId,
        function(error, result) {
            if (error) throw err;
            console.log(JSON.parse(JSON.stringify(o)));
        }
    )

    res.render('index');
})

app.get('/product', function (req, res) {
    console.log('Product');
})


