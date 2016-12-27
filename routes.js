module.exports = {

  loginUser (req, res, next, passport) {
    passport.authenticate('local-login', function (err, user, info) {

        if (err) {
          return next(err); // will generate a 500 error
        }

        // Generate a JSON response reflecting authentication status
        if (!user) {
          return res.send({isAuthenticationSuccess: false, authenticationMessage: 'authentication failed'});
        }

        req.login(user, loginErr => {
          if (loginErr) {
            return next(loginErr);
          }

          return res.send({
            userRole: user.userRole,
            isAuthenticationSuccess: true,
            authenticationMessage: 'authentication successful'
          });
        });
      })(req, res, next);
  },

  logoutUser (req, res) {
    req.logout();
    res.redirect('/');
  },

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

  getCustomersList (req, res, db) {
    db.collection('customers').find().toArray(function (err, results) {
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

submitUpdatedStockItems (req, res, db) {
    var data = req.body;
    var stocksUpdateData = data.items,moqData=[];
    db.collection('moq').find().toArray(function (err, results) {
      moqData=results;
    });
    var stocksUpdateDataLength = stocksUpdateData.length,
          moqDataLength = moqData.length,moqUpdateDataLength=[],
          successfulCount = 0,moqSuccessfulCount;
          stocksUpdateData.map((item) => {
          var id = item.Product_Code;
          delete item["_id"];
          item.updateOn = new Date();
          db.collection('stocks').updateOne({
            "Product_Code": id
          }, {
              $set: item
            }, function (err, updateResult) {
              if (updateResult.result.ok === 1) {
                successfulCount += 1;
                moqData.map((moqData) => {
                  if((moqData.Product_Code === id) && (item.Availability >5)){
                    db.collection('moq').remove({"Product_Code": item.Product_Code}, {justOne: true}, function (err, moqResult) {
                                  if (moqResult.result.ok === 1) {
                                    moqSuccessfulCount += 1;
                                  } else {
                                    res.status(500).json({
                                      message: "Request Failed"
                                    });
                                  }
                    });
                  }
                });
              } else {
                res.status(500).json({
                  message: "Request Failed"
                });
              }
              if (successfulCount === stocksUpdateDataLength) {
                console.log("here")
                
               res.status(200).json(updateResult);
              }
            });
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