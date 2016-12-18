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
    this.handleCancelAction = (event) => this._handleCancelAction (event);
  }

_handleCancelAction (event) {
  event.preventDefault();
  this.props.dispatch(push('/dashboard'));
}

render () {
    let isDisabled = this.state.selectedItems.length > 0 ? false : true,
        orders = this.props.customerOrders,
        customer = this.props.customerId;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div style={{marginTop: '25px'}} >
              <strong> <i> Customer ID: {customer}  <span style={{float: 'right'}}> Purchase Amount </span></i>  </strong>
              <Griddle results={orders}
                        useCustomRowComponent={true}
                        customRowComponent={PanelRender}/>
              <button className="btn btn-danger"
                      style={{float: 'right', marginTop: '5px'}}
                      onClick={(event) => this.handleCancelAction(event)} >
               Cancel
              </button> 
            </div>
        </div>
      </div>
      </div>
    );
  }
}

function select (state) {
  return {
    customerOrders: state.customerOrders
  };
}

export default connect(select)(CustomerOrders);


