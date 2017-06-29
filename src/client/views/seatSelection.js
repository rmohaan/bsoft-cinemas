/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';

class SeatSelection extends React.Component {
  constructor () {
    super();
    this.state = {
      links: ''
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    this.customerNameFormatter = (cell, row) => this._customerNameFormatter (cell, row);
    this.dateFormatter = (cell, row) => this._dateFormatter (cell, row);
  }

render () {
    let info = this.props.info ? this.props.info : [];
    console.log(this.props.info);
      if (info) {
        return (
          <div> Name: {info.name}, <br /> Screen: {info.screen}</div>
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
  console.log(state);
  return {
    info: state.info
  };
}

export default connect(select)(SeatSelection);
