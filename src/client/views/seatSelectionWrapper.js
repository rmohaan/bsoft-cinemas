/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import SeatSelection from './seatSelection';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class Home extends React.Component {
  constructor () {
    super();
    this.state = {
      links: ''
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }

  componentDidMount () {
    this.props.dispatch(actions.fetchLayoutData());
  }

  render () {
      return (
        <div className="container-fluid">
          <Header />
          <div className="container-fluid">
            <div className="row">
                <h1 className="page-header" style={{textAlign: 'center'}}>Screen this way</h1>
                <SeatSelection />
            </div>
          </div>
        </div>
      );
    }
}

export default connect()(Home);
