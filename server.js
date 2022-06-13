var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.sendFile('/Users/nhannvu/Desktop/quoine/liquid_web/dapp.html');
})

app.use(express.static('public'));

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
