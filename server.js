const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var routes = require('./routes');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
var app = express(),
  dir = __dirname,
  publicDir = path.join(dir, 'public'),
  imagesDir = path.join(dir, 'public', 'images'),
  buildDir = path.join(dir, 'public', 'build');


var db;

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.static(publicDir));
app.use(bodyParser.raw({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json());

app.use(favicon(path.join(imagesDir, 'favicon.ico')));
// mongodb://localhost:27017/fmcg
MongoClient.connect('mongodb://rmohaan:rmohaan%4012@ds131878.mlab.com:31878/fmcg', {
  uri_decode_auth: true
}, (err, database) => {

  // ... start the server
  if (err) return console.log(err)
  db = database;

  app.get('/api/getProductsList', (req, res) => routes.getProductsList(req, res, db));

  app.get('/api/getMoqList', (req, res) => routes.getMoqList (req, res, db));

  app.put('/api/submitOrder', (req, res) => routes.submitOrder(req, res, db));

  app.put('/api/submitCustomerInfo', (req, res) => routes.submitCustomerInfo(req, res, db));

  app.use((req, res, next) => {
    res.sendFile(path.join(publicDir, 'index.html'));
  });

  app.listen(4000, () => {
    console.log('listening on 4000')
  });
});

module.exports = {
  db
};
