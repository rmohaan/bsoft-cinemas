const express = require('express');
const bodyParser= require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
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

MongoClient.connect('mongodb://localhost:27017/fmcg', (err, database) => {
  // ... start the server
  if (err) return console.log(err)
  db = database;

  app.get('/api/getProductsList', (req, res) => {
      db.collection('stocks').find().toArray(function (err, results) {
          res.status(200).json(results);
          // send HTML file populated with quotes here
      });
  });

  app.put('/api/submitOrder', (req, res) => {
    console.log("submitOrder", req.body)
      db.collection('orders').insert(req.body, function (err, results) {
          console.log(results);
          if (results.result.ok === 1) {
            res.status(200).json(results);
          } else {
            res.status(500).json({message:"Request Failed"});
          }
      });
  });

  app.put('/api/submitCustomerInfo', (req, res) => {
    console.log("submitCustomerInfo", req.body)
      db.collection('customers').insert(req.body, function (err, results) {
          console.log(results);
          if (results.result.ok === 1) {
            res.status(200).json(results);
          } else {
            res.status(500).json({message:"Request Failed"});
          }
      });
  });

  app.use((req, res, next) => {
      console.log(req.url);
      console.log(buildDir);
      res.sendFile(path.join(publicDir, 'index.html'));
  });

  app.listen(4000, () => {
    console.log('listening on 4000')
  });

});

module.exports = { db };