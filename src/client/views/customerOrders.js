/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Header from './header';
import Griddle from 'griddle-react';
import SearchBar from './searchBar';
import PanelRender from './panelRender';
import * as actions from '../actions';

class CustomerOrders extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedItems: []
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
    this.customFilterFunction = (items, query) => this._customFilterFunction (items, query);
    this.updateRowChange = (row, event) => this._updateRowChange (row, event); 
    this.updateRowChange2 = (row, event) => this._updateRowChange2 (row, event);
    this.setSelectedItems = (items, event) => this._setSelectedItems (items, event);
    this.generateModifiedList = (list) => this._generateModifiedList(list);
    this.addOneItem = (event, data) => this._addOneItem(event, data);
    this.reduceOneItem = (event, data) => this._reduceOneItem(event, data);
    this.selectedItems = [];
  }

render () {
    let isDisabled = this.state.selectedItems.length > 0 ? false : true,
        orders = this.props.orderDetails.orders,
        customer = this.props.orders.customer;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div style={{marginTop: '25px'}} >
              <strong> <i> {customer.name}  <span style={{float: 'right'}}> {customer.totalAmount} </span></i>  </strong>
              <PanelRender data={orders} />
              <a className="btn btn-success" style={{float: 'right', marginTop: '5px'}} onClick={(event) => this.setSelectedItems(this.state.selectedItems, event)} disabled={isDisabled}>Checkout</a> 
            </div>
        </div>
      </div>
      </div>
    );
  }
}

function select (state) {
  console.log(state);
  return {
    orderDetails: state.customerOrders
  };
}

export default connect(select)(CustomerOrders);


