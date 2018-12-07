const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const orderSchema = new Schema({
  toppings: [String],
  crust: String,
  size: String,
  quantity: Number,
  name: String,
  phone: String,
  address: String,
  total: Number
});

module.exports = mongoose.model('Order', orderSchema);
