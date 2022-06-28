var express = require('express');
const path = require('path');
var app = express();

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/dapp.html'));
})

app.use(express.static('public'));

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
