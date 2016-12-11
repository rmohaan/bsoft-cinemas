const express = require('express');
const bodyParser = require('body-parser');
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
// mongodb://localhost:27017/fmcg
MongoClient.connect('mongodb://rmohaan:rmohaan%4012@ds131878.mlab.com:31878/fmcg', {
  uri_decode_auth: true
}, (err, database) => {

  // ... start the server
  if (err) return console.log(err)
  db = database;

  app.get('/api/getProductsList', (req, res) => {
    db.collection('stocks').find().toArray(function (err, results) {
      res.status(200).json(results);
      // send HTML file populated with quotes here
    });
  });

  app.get('/api/getMoqList', (req, res) => {
    db.collection('moq').find().toArray(function (err, results) {
      res.status(200).json(results);
      // send HTML file populated with quotes here
    });
  });

  app.put('/api/submitOrder', (req, res) => {
    var data = req.body;
    var stocksUpdateData = data.stocks_update;
    var moqData = data.moq_update;
    delete data["stocks_update"];
    delete data["moq_update"];
    data.createdOn = new Date();
    db.collection('orders').insert(data, function (err, results) {
      if (results.result.ok === 1) {
        var stocksUpdateDataLength = stocksUpdateData.length,
          moqUpdateDataLength = moqData.length,
          successfulCount = 0;
        stocksUpdateData.map((item) => {
          var id = item.Product_Code;
          delete item["Product_Code"];
          item.createdOn = new Date();
          db.collection('stocks').updateOne({
            "Product_Code": id
          }, {
              $set: item
            }, function (err, updateResult) {
              if (updateResult.result.ok === 1) {
                successfulCount += 1;
              } else {
                res.status(500).json({
                  message: "Request Failed"
                });
              }
              if (successfulCount === stocksUpdateDataLength) {
                var moqSuccessfulCount = 0;
                if (moqUpdateDataLength > 0) {
                  moqData.map((item) => {
                    delete item["_id"];
                    item.createdOn = new Date();
                    db.collection('moq').update({
                      "Product_Code": item.Product_Code
                    }, {
                        $set: item
                      }, {
                        upsert: true
                      }, function (err, moqResult) {
                        if (moqResult.result.ok === 1) {
                          moqSuccessfulCount += 1;
                        } else {
                          res.status(500).json({
                            message: "Request Failed"
                          });
                        }
                        if (moqSuccessfulCount === moqUpdateDataLength) {
                          res.status(200).json(results);
                        }
                      });
                  });
                } else {
                  res.status(200).json(results);
                }
              }
            });
        });

      } else {
        res.status(500).json({
          message: "Request Failed"
        });
      }
    });
  });

  app.put('/api/submitCustomerInfo', (req, res) => {
    req.body.createdOn = new Date();
    db.collection('customers').insert(req.body, function (err, results) {
      if (results.result.ok === 1) {
        res.status(200).json(results);
      } else {
        res.status(500).json({
          message: "Request Failed"
        });
      }
    });
  });


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
