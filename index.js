const express = require('express');
const app = express();
//const path = require('path');
const bodyParser = require('body-parser');
const menu = require('./pizza-menu')
const Order = require('./order')


//console.log(menu);
//app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
	res.render('index', { menu: menu});
});
app.post('/confirmation/', (req,res)=>{
  //console.log(req);
  const body =  req.body; 
  const toppings = []; 
  
  console.log(body);
  for (var key in body){
   // console.log(body[key]);
    if(body[key]=='on'){
    toppings.push(key);
    }
  }
  let order = new Order(toppings, body.crust, body.size);
  console.log(order.getTotals());
  res.render('confirmation',{ order: order }) 
})

var server = app.listen(3000, ()=>{
  console.log('listening on' + server.address().address +'' + server.address().port);
})

/**
 * Check for changes
 * npm install supervisor -g
 * supervisor .
 */