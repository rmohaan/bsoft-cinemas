module.exports = {

  getData (req, res, db) {
    res.status(200).json({
      layout: {
        totalSeats: 20,
        occupied: [1,2,3,4,15,6,17,18,9,10]
      }
    });
  },

  submitData (req, res, db) {
    req.body.createdOn = new Date();
  //   db.collection('customers').insert(req.body, function (err, results) {
  //     if (results.result.ok === 1) {
  //       res.status(200).json(results);
  //     } else {
  //       res.status(500).json({
  //         message: "Request Failed"
  //       });
  //     }
  //   });
   }
};
