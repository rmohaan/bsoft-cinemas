module.exports = {

  getProductsList (req, res, db) {
    db.collection('stocks').find().toArray(function (err, results) {
      res.status(200).json(results);
    });
  },

  getMoqList (req, res, db) {
    db.collection('moq').find().toArray(function (err, results) {
      res.status(200).json(results);
    });
  },

  getCustomerOrders (req, res, db) {
    var customerId = req.query.customerId;
    console.log(customerId);
    db.collection('orders').find({'customerId': customerId}).toArray(function (err, results) {
      res.status(200).json(results);
    });
  },

  submitOrder (req, res, db) {
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
  },

  submitCustomerInfo (req, res, db) {
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
  }
};