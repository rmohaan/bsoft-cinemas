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

  componentDidMount () {
    this.props.dispatch(actions.fetchOrders(this.props.params.id));
  }

render () {
    
    return (
      <div className="">
        <Header />
        <CustomerOrders customerId={this.props.params.id}/>
        <Footer />
      </div>
    );
  }
}

export default connect()(CustomerOrdersWrapper);
