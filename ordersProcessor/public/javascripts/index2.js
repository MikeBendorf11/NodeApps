$(function ready() {

    $("#submitForm").submit(function (event) {
        event.preventDefault();
        var data = JSON.stringify( $("#submitForm").serializeArray() );
        
         //console.log($("#submitForm").serializeArray());
        // console.log(data);

        var formData = $('#submitForm').serializeArray();
        //console.log(formData);
        var toppings = [];
        var requestMap = new Map();
        formData.forEach((v,i,a) => {
          if(v['name']=='toppings'){
            toppings.push(v['value']);
          } else {
            requestMap.set(v['name'],v['value'])
          }
        });
        var requestObj = {};
        requestObj.toppings = toppings;
        requestMap.forEach((v,k,m)=>{
          requestObj[k] = v;
        })
        //console.log(requestObj);
         
        var orderInfo = JSON.stringify(requestObj);

        $.ajax({
            url: '/api/orders',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: orderInfo,
            success: function (json, status, request) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-success');
                $('#statusMsg').html('Added the order');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error adding the order');
                console.log('Request failed : ', jqXHR.responseJSON);
                var log = JSON.stringify(jqXHR.responseJSON.fields);
                alert("Invalid Fields: " + log);
              
            }
        });

    });
});