/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';
import CustomerOrders from './customerOrders';
import * as actions from '../actions/index';

class CustomerOrdersWrapper extends React.Component {
  constructor () {
    super();
    this.customerId = '9003716456';
  }
  
  componentDidMount () {
    this.props.dispatch(actions.fetchOrders(this.customerId));
  }


render () {
    
    return (
      <div className="">
        <Header />
        <CustomerOrders customerId={this.customerId}/>
        <Footer />
      </div>
    );
  }
}

export default connect()(CustomerOrdersWrapper);
