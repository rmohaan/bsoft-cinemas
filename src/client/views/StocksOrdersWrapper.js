/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';
import orderUpdate from './orderUpdate';
import * as actions from '../actions/index';

class StocksOrdersWrapper extends React.Component {
  constructor () {
    super();
  }
  
  componentDidMount () {
    console.log("testingasdasdas")
    this.props.dispatch(actions.fetchProductsList());
  }


render () {
    
    return (
      <div className="">
        <Header />
        <orderUpdate />
        <Footer />
      </div>
    );
  }
}

export default connect()(StocksOrdersWrapper);
