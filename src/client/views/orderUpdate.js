/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};
class orderUpdate extends React.Component {
  constructor () {
    super();
    this.state = {
      productItems: []
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
  }

  componentDidMount () {
    this.props.dispatch(actions.fetchProductsList());
  }

  render() {
    console.log(this.props.list)
    return (
      <BootstrapTable data={ this.props.list } cellEdit={ cellEditProp }>
          <TableHeaderColumn dataField='Product_Code' isKey={ true }>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='Product_Name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='Quantity'>Product Price</TableHeaderColumn>
          <TableHeaderColumn dataField='Availability'>Availability</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

function select (state) {
  return {
    list: state.productsList
  };
}

export default connect(select)(orderUpdate);

