var express = require('express');
var http = require('http');

var share = require('share').server;

var app = express();
var port = process.env.PORT || 8080;


app.configure(function(){
  this.use(express.static(__dirname  + "/public"));
});

var sharedb = { type: 'redis' };

if (process.env.REDISTOGO_URL) { 
  var url = require('url');
  var redisUrl = url.parse(process.env.REDISTOGO_URL);

  sharedb.type     = 'redis';
  sharedb.hostname = redisUrl.hostname;
  sharedb.port     = redisUrl.port;
  sharedb.auth     = redisUrl.auth;
  sharedb.prefix   = process.env.REDIS_PREFIX || 'super';
}

share.attach(app, { db: sharedb });

http.createServer(app).listen(port, function(){
  console.log('listening in http://localhost:' + port);
});