/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';
import StocksUpdate from './StocksUpdate';
import * as actions from '../actions/index';

class StocksOrdersWrapper extends React.Component {
  constructor () {
    super();
  }
  
  componentDidMount () {
    this.props.dispatch(actions.fetchProductsList());
  }


render () {
    var textColor = {
      color: 'aliceblue'
    };
    return (
      <div>
        <Header />
          <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div>
                        <h2 style={textColor}>Update Stocks</h2>
                  </div>
                  <div>
                    <StocksUpdate page={"StocksUpdate"}/>
                  </div>
                 </div>
              </div>
          </div>
        <Footer />
      </div>
    );
  }
}

export default connect()(StocksOrdersWrapper);
