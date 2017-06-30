/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';

class SeatSelection extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedSeats: []
    };
    this.handleSeatSelection = (event) => this._handleSeatSelection(event);
    this.getSeatsLayout = (data) => this._getSeatsLayout(data);
    this.getMovieSummary = (data) => this._getMovieSummary(data);
  }

  _handleSeatSelection(event) {
    let selectedSeat = parseInt(event.target.id),
        selection = this.state.selectedSeats,
        alreadyExistingId = selection.indexOf(selectedSeat);
    if (alreadyExistingId > -1) {
      selection.splice(alreadyExistingId, 1);
    }
    else {
      selection.push(selectedSeat);
    }
    this.setState({
      selectedSeats: selection
    })
  }

  _getSeatsLayout (data = []) {
    if (data) {
      return data.map( (item, index) => {
        if (item === 0) {
          return (
            <div key={index} id={index} className="col-md-1 seat-occupied">
            </div>
          );
        }
        else {
          let seatStyle = this.state.selectedSeats.indexOf(index) > -1 ? "col-md-1 seat-free selected" : "col-md-1 seat-free";
          return (
            <div key={index} id={index} className={seatStyle} onClick={this.handleSeatSelection}>
            </div>
          );
        }
      });
    }
  }

  _getMovieSummary (data = {}) {
    let movieDetailsStyle = "movie-details-items",
        summaryStyle = "summary-text";
    return (
      <div className="movie-details well">
          <div>
            Movie
            <div className={summaryStyle}> {data.movieName} </div>
          </div>
          <div className={movieDetailsStyle}>
            Screen
            <div className={summaryStyle}> {data.screen} </div>
          </div>
          <div className={movieDetailsStyle}>
            At
            <div className={summaryStyle}> {data.theatreName} </div>
          </div>
          <div className={movieDetailsStyle}>
            Showtime
            <div className={summaryStyle}> {moment(data.date).format('MMM, DD YYYY HH:mm').toString()} </div>
          </div>
          <div className={movieDetailsStyle}>
            Seats
            <div className={summaryStyle}>
              { this.state.selectedSeats.length > 0 ?
                this.state.selectedSeats.sort((a, b) => { return a - b } ).map(i => i+1).toString() :
                '-'
              }
             </div>
          </div>
          <div className="amount-text">
            <div className="price-summary">
              Ticket Price: {this.state.selectedSeats.length > 0 ?  this.state.selectedSeats.length * 120 : 0}
              <div>
                Booking Charges: {this.state.selectedSeats.length > 0 ?  this.state.selectedSeats.length * 30 : 0}
              </div>
            </div>
            Total Amount Rs. {this.state.selectedSeats.length * 150}
          </div>
      </div>
    )
  }

render () {
    let info = this.props.info ? this.props.info : [];
      if (info) {
        return (
          <div className="container-fluid">
            <div className="panel panel-success panel-container">
              <div className="panel-heading">
                <div className="pick-seat-text">
                  Pick your seats
                </div>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-7">
                      <div className="col-md-12 screen">Screen facing this way</div>
                      {this.getSeatsLayout(this.props.layout ? this.props.layout.seatLayout : [])}
                  </div>
                  <div className="col-md-5">
                      {this.getMovieSummary(this.props.info ? this.props.info : {})}
                  </div>
                </div>
              </div>
              <div className="panel-footer flexFooter">
                <div className="selected-seat-text">
                  You have selected {this.state.selectedSeats.length} seat(s).
                </div>
                <div>
                  <button className="btn btn-success" onClick={() => alert("Thank you!")}>Checkout</button>
                </div>
            </div>
            </div>
            <div className="row legend">
                <div className="col-md-4">
                  <div className="col-md-12 legend-head-text">
                    Seats Legend
                  </div>
                  <div className="col-md-3">
                    <div className="seat-free legend-item">
                    </div>
                    <span>Available</span>
                  </div>
                  <div className="col-md-3">
                    <div className="seat-occupied legend-item">
                    </div>
                    <span>Booked</span>
                  </div>
                  <div className="col-md-3">
                    <div className="seat-free selected legend-item">
                    </div>
                    <span>Selected</span>
                  </div>
                </div>
            </div>
          </div>

        );
      } else {
        return (
          <div>
             <div className="loader" height='100px' width='100px'>Testing and test working</div>
          </div>
        );
      }
  }
}

function select (state) {
  return {
    info: state.info,
    layout: state.layout
  };
}

export default connect(select)(SeatSelection);
