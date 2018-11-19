const menu = require('./pizza-menu')
const tax = 1.12;

module.exports = class Order{
  constructor(toppings, crust, size){
    this.toppings = toppings;
    this.crust = crust;
    this.size = size;
  }
  getTotals(){
    let base = 0;
    let factor = menu.size[this.size];
    this.toppings.forEach(element => {
      if(menu.toppings[element]){
        base += menu.toppings[element]
      }
    });
    base += menu.crust[this.crust]
    var beforeTax = base * factor;
    var afterTax = beforeTax * tax;
    return {beforeTax: beforeTax, afterTax: afterTax};
  }
  
}
