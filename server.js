var express = require('express');
var http = require('http');

var share = require('share').server;

var app = express();
var port = process.env.PORT || 8080;

app.configure(function(){
  this.use(express.static(__dirname  + "/public"));
});

//setup share
share.attach(app, {
  db: {type: 'none'}
});

http.createServer(app).listen(port, function(){
  console.log('listening in http://localhost:' + port);
});