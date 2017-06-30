/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import SeatSelection from './seatSelection';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class Home extends React.Component {

  componentDidMount () {
    this.props.dispatch(actions.fetchLayout());
  }

  render () {
      return (
        <div className="container-fluid">
          <Header />
          <SeatSelection />
        </div>
      );
    }
}

export default connect()(Home);
