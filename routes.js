const TOTAL_SEATS = 80;

function createSeatsLayout() {
  let seatsLayout = [];
  for (let i=0; i<TOTAL_SEATS; i++) {
    seatsLayout.push(Math.round(Math.random()));
  }
  return seatsLayout;
}

module.exports = {

  getData (req, res, db) {
    res.status(200).json({
      layout: {
        totalSeats: TOTAL_SEATS,
        seatLayout: createSeatsLayout(),
      }
    });
  },
};
