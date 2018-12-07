$(function ready() {

  $.getJSON("/api/orders", function (data) {
  console.log(data);
      data.forEach(function(item, i) {
        console.log(item);
          $('#orders').append(
              `
              <table class="table table-striped table-bordered
table-hover table-condensed">

              
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
      });
  });

});