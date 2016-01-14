// modules
var express = require('express');
var bodyParser = require('body-parser');

// start app
var app = express();

app.use(bodyParser.json());

var port = 9000;

app.listen(9000, function() {
  console.log('Listening on port ', port);
});

// for compatibility with browser in .status(200).set() below
var browserHeads = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'Content-Security-Policy': "default-src 'self' devmountain.github.io"
};


// for temporarily storing messages
var messages = [
];

app.options('/messages', function(req, res, next) {
  res.status(200).set(browserHeads).send();
});

app.get('/messages', function(req, res, next) {
  res.status(200).set(browserHeads).send(messages);
});

app.post('/messages', function(req, res, next) {
  var newMessage = req.body.message;
  newMessage.timestamp = Date.parse(new Date());
  messages.push(newMessage);
  console.log("message received");
  res.status(200).set(browserHeads).send(messages);
});
