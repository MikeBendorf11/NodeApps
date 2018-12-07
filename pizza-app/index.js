const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const menu = require('./pizza-menu')
const Order = require('./order')
const validator = require('validator');
const fs = require('fs');
//order should not be global
//if 2 orders at the same time, it will take only last or 
//people will receive the wrong order
let order = {}


//console.log(menu);
app.use(express.static(path.join(__dirname,'dist')));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
	res.render('index', { menu: menu, errors: {}});
});
app.post('/confirmation/', (req,res)=>{
  //console.log(req);
  const body =  req.body; 
  const toppings = []; 
  
  //console.log(body);
  for (var key in body){
   // console.log(body[key]);
    if(body[key]=='on'){
    toppings.push(key);
    }
  }
  let inputErrors = {};
  var flag = false;
  inputErrors.name = !validator.isAlpha(body.name.replace(/\s+/, "")) ? "Invalid name" : "";
  inputErrors.phone = !validator.isMobilePhone(body.phone) ? "Invalid phone": "";
  inputErrors.address = body.address.length < 8 ? "Invalid address":"";
  for(var key in inputErrors){
    if(inputErrors[key]){
      flag = true;
      //console.log(inputErrors[key]);
    }
  }
  if(flag){
    order = {}
    res.render('index', {menu: menu, errors: inputErrors} );
  } else {
    order = new Order(
      toppings, 
      body.crust, 
      body.size,
      body.name,
      body.phone,
      body.address,
      body.quantity
    );
    res.render('confirmation',{ order: order, totals: order.getTotals() }) 
  }
})

app.post('/index/',(req, res)=>{
  //console.log(req.body.confirm);
  const body =  req.body; 
  if(body.confirm=='yes'){
    let json = JSON.stringify(order, null, '\t');
    fs.writeFile('./orders/'+Date.now()+'.json',json, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    })
  } else {
    order = {};
  }
  res.render('index', { menu: menu, errors: {} });
})

var server = app.listen(3000, ()=>{
  console.log('listening on' + server.address().address +'' + server.address().port);
})

/**
 * Check for changes
 * npm install supervisor -g
 * supervisor .
 */