const express = require('express');
const app = express();

var server = app.listen(3000, ()=>{
  console.log('listening on' + server.address().address +'' + server.address().port);
})

