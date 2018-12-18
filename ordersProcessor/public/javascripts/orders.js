$(function ready() {
  function writeOrders(item) {
    $('#orders').append(
      `
      <table class="table table-striped table-bordered table-hover table-condensed">
      <tbody>
      <tr>
      <th>Order Id</th>
      <th>${item._id}</th>
      </tr>
      <tr>
        <td>Toppings</td>
        <td>${item.toppings}</td>
      </tr>
      <tr>
        <td>Crust</td>
        <td>${item.crust}</td>
      </tr>
      <tr>
        <td>Size</td>
        <td>${item.size}</td>
      </tr>  
      <tr>
        <td>Quantity</td>
        <td>${item.quantity}</td>
      </tr> 
      <tr>
        <td>Total</td>
        <td>$${item.total} USD</td>
      </tr> 
      <tr>
        <th colspan="2">Customer</th>
      </tr>
      <tr>
        <td>Name:</td>
        <td>${item.name}</td>
      </tr>       
      <tr>
        <td>Phone:</td>
        <td>${item.phone}</td>
      </tr>  
      <tr>
        <td>Address:</td>
        <td>${item.address}</td>
      </tr>               
      </tbody>
      </table> 
      `
    );
  }
  $.getJSON("/api/orders", function (data) {
    //console.log(data);
    data.forEach(function (item, i) {
      //console.log(item);
      writeOrders(item);
    });
  });

  var wto;

  $('#search').on('input', (data) => {
    clearTimeout(wto);
    wto = setTimeout(function() {
      console.log(data.target.value);
      var text = data.target.value;
      var ods = document.querySelector('#orders');
      ods.innerHTML = ""
      $.getJSON(`/api/orders/${text}`, function (data) {
        console.log(data);
        data.forEach(function (item, i) {
          //console.log(item);
          writeOrders(item);
        });
      })
    }, 1000);

  })
});