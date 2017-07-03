/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { sortAlphaNumeric, rowMap, SEATS_IN_ROW, BASE_FARE, RESERVATION_CHARGES } from '../utils';

class SeatSelection extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedSeatsIndex: [],
      selectedSeats: []
    };
    this.handleSeatSelection = (event) => this._handleSeatSelection(event);
    this.getSeatsLayout = (data) => this._getSeatsLayout(data);
    this.getMovieSummary = (data) => this._getMovieSummary(data);
  }

  _handleSeatSelection(event) {
    let clickedSeat = parseInt(event.target.id),
        row = rowMap[Math.floor(clickedSeat / SEATS_IN_ROW)],
        rowNum = (clickedSeat % SEATS_IN_ROW) + 1,
        selectedSeat = row+rowNum,
        selection = this.state.selectedSeats,
        alreadyExistingId = selection.indexOf(selectedSeat),
        selectedIndex = this.state.selectedSeatsIndex;
    if (alreadyExistingId > -1) {
      selection.splice(alreadyExistingId, 1);
      selectedIndex.splice(selectedIndex.indexOf(clickedSeat), 1);
    }
    else {
      if (this.state.selectedSeats.length >= 15) {
        alert("Maximum seats allowed per transaction is 15")
        return;
      }
      selection.push(selectedSeat);
      selectedIndex.push(clickedSeat);
    }
    this.setState({
      selectedSeats: selection,
      selectedSeatsIndex: selectedIndex
    })
  }

  _getSeatsLayout (data = []) {
    let head, cells,
        rows=[];
    if (data) {
      for (let i=0; i<data.length/SEATS_IN_ROW; i++){
        rows.push(data.slice(i*SEATS_IN_ROW, (i*SEATS_IN_ROW)+SEATS_IN_ROW));
      }
      head = rows.map( (item, index) => {
        let keyBase = (index * SEATS_IN_ROW);
        cells = item.map((itm, indx) => {
          let key = keyBase+indx,
              seatNumber = indx + 1;
          if (itm === 0) {
            return (
              <div key={key} id={key} className="seat seat-occupied">
                {seatNumber}
              </div>
            );
          }
          else {
            let seatStyle = this.state.selectedSeatsIndex.indexOf(key) > -1 ? "seat seat-free selected" : "seat seat-free";
            return (
              <div key={key} id={key} className={seatStyle} onClick={this.handleSeatSelection}>
                {seatNumber}
              </div>
            );
          }
        });

        return (
          <div key={index} className="seat-rows">
            <div key="0" className="seat-row-name">{rowMap[index]}</div>
            {cells}
          </div>
        )
      });
    }
    return head;
  }

  _getMovieSummary (data = {}) {
    let movieDetailsStyle = "movie-details-items",
        summaryStyle = "summary-text",
        selectedSeats = this.state.selectedSeats.length;
    return (
      <div className="movie-details">
          <div className="ticket-summary-text"> Ticket Summary </div>
          <div className={movieDetailsStyle}>
            Selected Movie
            <div className={summaryStyle}> {data.movieName} </div>
          </div>
          <div className={movieDetailsStyle}>
            Screen
            <div className={summaryStyle}>
              {data.screen}
            </div>
          </div>
          <div className={movieDetailsStyle}>
            Show Time
            <div className={summaryStyle}> {moment(data.date).format('MMM, DD YYYY HH:mm')} </div>
          </div>
          <div className={movieDetailsStyle}>
            Seats {selectedSeats > 0 ? ' - ' + selectedSeats : ''}
            <div className={summaryStyle}>
              { selectedSeats > 0 ?
                this.state.selectedSeats.sort(sortAlphaNumeric).join(', ') :
                '-'
              }
             </div>
          </div>
          <div className="amount-text">
            <div className="price-summary">
              Ticket Price: {selectedSeats > 0 ?  selectedSeats * BASE_FARE : 0}
              <div>
                Booking Charges: {selectedSeats > 0 ?  selectedSeats * RESERVATION_CHARGES : 0}
              </div>
            </div>
            Total Amount Rs. {selectedSeats * (BASE_FARE + RESERVATION_CHARGES)}
          </div>
      </div>
    )
  }

  getLegendLayout () {
    return (
      <div className="legend-items">
        <div className="legend-item-container">
          <div className="seat-free legend-item">
          </div>
          <span>Available</span>
        </div>
        <div className="legend-item-container">
          <div className="seat-occupied legend-item">
          </div>
          <span>Booked</span>
        </div>
        <div className="legend-item-container">
          <div className="seat-free selected legend-item">
          </div>
          <span>Selected</span>
        </div>
      </div>
    )
  }

render () {
    let info = this.props.info ? this.props.info : [];
      if (info) {
        return (
          <div className="container-fluid">
            <div className="panel panel-container">
              <div className="panel-heading">
                <div className="pick-seat-text">
                  Pick your seats
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-body-container">
                  <div className="seat-container">
                      <div className="screen">Screen facing this way</div>
                      <div className="seat-layout">
                        {this.getSeatsLayout(this.props.layout ? this.props.layout.seatLayout : [])}
                      </div>
                  </div>
                  <div className="movie-details-container">
                      {this.getMovieSummary(this.props.info ? this.props.info : {})}
                  </div>
                </div>
              </div>
              <div className="panel-footer flex-footer">
                {this.getLegendLayout()}
                <div className="button-checkout-container">
                  <button className="btn button-success" onClick={() => alert("Thank you!")}>Checkout</button>
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
