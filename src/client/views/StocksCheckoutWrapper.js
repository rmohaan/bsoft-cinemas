/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';
import StocksUpdate from './StocksUpdate';
import * as actions from '../actions/index';

class StocksCheckoutWrapper extends React.Component {
  constructor () {
    super();
  }
  
  componentDidMount () {
  }


render () {
    var blueColor = {
      color: 'blue'
    };
    return (
      <div className="">
        <Header />
          <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div>
                        <h2 style={blueColor}>Update stock confirm</h2>
                  </div>
                  <div>
                    <StocksUpdate page={"StocksConfirm"}/>
                  </div>
                 </div>
              </div>
          </div>
        <Footer />
      </div>
    );
  }
}

export default connect()(StocksCheckoutWrapper);
