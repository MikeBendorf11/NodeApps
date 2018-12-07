var express = require('express');
let Order = require('../models/orderModel');
var menu = require('../priceList.json')
var Calc = require('../calculator')
var router = express.Router();
const validator = require('validator');

router.get('/', function (req, res) {
  var vm = { title: "Order Processor", menu: menu, errors: {} };
  res.render('index2', vm);
});

router.get('/orders', function (req, res) {
  var vm = { title: "Order Processor" };
  res.render('orders', vm);
});

//API or REST Endpoints are defined below

router.get('/api/orders', function (req, res) {
  Order.find({})
  .limit(100)
  .exec(function (err, orders) {
    res.json(orders);
  })
});

router.get('/api/orders/:param', function (req, res) {
  var query = req.params;
  var orders = [];
  console.log(query);
  Order.find(
    { "phone": { 
        "$regex": query.param, "$options": "i" 
      }
    },
    function(err,data) { 
      if(data!=[]){
        data.forEach(v=>{
          //console.log(v);
          orders.push(v);
        })
        
      }
  
    } 
  );
  Order.find(
    { "address": { 
        "$regex": query.param, "$options": "i" 
      }
    },
    function(err,data) { 
      if(data!=[]){ 
        data.forEach(v=>{
          //console.log(v);
          orders.push(v);
        })
        res.json(orders)
      } 
    }
  );
});

/* ?? to complete after front end */
router.post('/api/orders', function (req, res) {
  var body = req.body;

  var calc = new Calc(
    body.toppings,
    body.crust,
    body.size,
    body.name,
    body.phone,
    body.address,
    body.quantity
  )

  var order = new Order(calc);
  order.total = calc.getTotals().beforeTax.toFixed(2);;

  console.log("Received add order request", order);
  //res.json({ status: "Successfully added an order" })
  /*?? validation */

  let valid = {
    name: validator.isAlpha(body.name.replace(/\s+/, "")) || body.name!="",
    phone: validator.isMobilePhone(body.phone),
    address: body.address.length > 8
  };
  
  for (var key in valid) {
    if (!valid[key]) {
      res.status(400);
      res.json({ 
        fields: valid,
        error: "Incorrect information for the order" 
      });
      return;
    }
  }

  order.save(function (err) {
      if (err) {
          console.log("Error : ", err);
          res.status(500).json({ status: "Failed to save the order" });
          return;
      }
      res.json({ status: "Successfully added a order" });
  });
});

module.exports = router;


