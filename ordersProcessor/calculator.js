const pl = require('./priceList');
const tax = 1.12;

module.exports = class Calculator{
  constructor(toppings, crust, size, name, phone, address, quantity){
    this.toppings = toppings;
    this.crust = crust;
    this.size = size;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.quantity = quantity;
  }
  getTotals(){
    let base = 0;
    let factor = pl.size[this.size];
    this.toppings.forEach(element => {
      if(pl.toppings[element]){
        base += pl.toppings[element]
      }
    });
    base += pl.crust[this.crust]
    var beforeTax = base * factor * this.quantity;
    var afterTax = beforeTax * tax;
    return {
      tax: afterTax - beforeTax,
      beforeTax: beforeTax, 
      afterTax: afterTax
    };
  }
  getDelivery(){
    let time = 0;
    if(this.quantity>1){
      time = this.quantity * 15;
      let hours = time/60;
      let minutes = (hours%1)*60;
      return Math.trunc(hours) + 'h:' + minutes + 'm';
    } 
    return '30m'
  }
}
