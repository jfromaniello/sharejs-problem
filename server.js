var express = require('express');
var http = require('http');

var share = require('share').server;

var app = express();
var port = process.env.PORT || 8080;


app.configure(function(){
  this.use(express.static(__dirname  + "/public"));
});

var url = require('url');
var redisUrl = url.parse(process.env.REDISTOGO_URL);
//setup share
share.attach(app, {
  db: {
    type:     'redis',
    hostname: redisUrl.hostname,
    port:     redisUrl.port,
    auth:     redisUrl.auth,
    prefix:   process.env.REDIS_PREFIX || 'super'
  }
  // db: {type: 'none'} or redis
});

http.createServer(app).listen(port, function(){
  console.log('listening in http://localhost:' + port);
});