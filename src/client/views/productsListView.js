/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Header from './header';
import Griddle from 'griddle-react';
import SearchBar from './searchBar';
import RowRender from './rowRender';
import * as actions from '../actions';

class ProductsList extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedItems: []
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
    this.handleRowClick = (row) => this._handleRowClick (row); 
    this.setSelectedItems = (items, event) => this._setSelectedItems (items, event);
    this.generateModifiedList = (list) => this._generateModifiedList(list);
    this.addOneItem = (event, data) => this._addOneItem(event, data);
    this.reduceOneItem = (event, data) => this._reduceOneItem(event, data);
  }

_handleRowClick (row) {
  var exis = JSON.parse(JSON.stringify(this.state.selectedItems)),
      item = exis.find(item => row.productCode === item.productCode);
  if (!item) {
    let selectedNewItem=Object.assign({}, row);
    if (selectedNewItem.availability > 0) {
      selectedNewItem.availability -= 1;
      exis.push({
        ...selectedNewItem,
        quantity: 1
      });
    } else {
      alert ("Item not in stock!");
    }
  } else {
    if (item.availability > 0) {
      item.availability -= 1;
      item.quantity += 1;
    } else {
      // we can add a table {OUT OF STOCK} and push the items popping here as well
      // while updating the table, we need to ensure if the user enters 10 items initially
      // and removing the 10 items from selected, we need to remove that item in off stocks 
      // list as well
      alert ("Item out of stock!");
    }

  }
  this.setState ({
    selectedItems: exis
  })
}

_setSelectedItems (items, event) {
  event.preventDefault();
  this.props.dispatch(actions.setSelectedItems({items}));
  this.props.dispatch(push('/checkout'));
}

_addOneItem (event, data) {
  let newState = JSON.parse(JSON.stringify(this.state.selectedItems)),
      item = newState.find((item) => item.productCode === data.productCode);
  
  if (item.availability > 0) {
      item.availability -= 1;
      item.quantity += 1;
    } else {
      alert ("Item out of stock!");
    }

  this.setState ({
    selectedItems: newState
  });
}

_reduceOneItem (event, data) {
  let newState = JSON.parse(JSON.stringify(this.state.selectedItems)),
      item = newState.find((item) => item.productCode === data.productCode);

  if (item.quantity > 1) {
      item.availability += 1;
      item.quantity -= 1;
    } else {
      var indexToRemove = newState.findIndex((item) => {
        return item.productCode === data.productCode;
      });
      newState.splice(indexToRemove, 1);
    }
  this.setState ({
    selectedItems: newState
  });
}

render () {
    const rowOptions = {
       onRowClick: this.handleRowClick
    }
    let isDisabled = this.state.selectedItems.length > 0 ? false : true,
        productsList = this.props.list.length > 0 ? this.props.list : [];

    if (productsList.length > 0 ) {
        return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <BootstrapTable data={ productsList } height='620px' options={ rowOptions }>
                <TableHeaderColumn isKey
                                    width='100'
                                    dataField='productCode'
                                    filter={ { type: 'TextFilter', delay: 500 } } >
                    Product Name
                  </TableHeaderColumn>
                  <TableHeaderColumn width='150'
                                    dataField='productName'
                                    filter={ { type: 'TextFilter', delay: 500 } } >
                    Product Name
                  </TableHeaderColumn>
                  <TableHeaderColumn width='75' dataField='stockPosition'>Location</TableHeaderColumn>
                  <TableHeaderColumn width='50' dataField='unit'>Unit</TableHeaderColumn>
                  <TableHeaderColumn width='75' dataField='availability'>Availability</TableHeaderColumn>
                  <TableHeaderColumn width='75' dataField='price'>Price</TableHeaderColumn>
                </BootstrapTable>
            </div>
            <div className="col-md-6">
              <div style={{marginTop: '25px'}} >
                <strong> <i> Items to checkout </i> </strong>
                <RowRender data={this.state.selectedItems}
                          addOneItem={this.addOneItem}
                          reduceOneItem={this.reduceOneItem}
                          forCheckout={false}
                          cols={['productCode', 'productName', 'quantity', 'stockStatus']} />
                <button className="btn btn-success"
                    style={{float: 'right', marginTop: '5px'}}
                    onClick={(event) => this.setSelectedItems(this.state.selectedItems, event)}
                    disabled={isDisabled} >
                    Checkout
                </button> 
              </div>
          </div>
        </div>
        </div>
      );
    } else {
      return (
        <div>
           <div className="loader" height='100px' width='100px'>Loading...</div>
        </div>
      );
    }
    
  }
}

function select (state) {
  return {
    list: state.productsList,
    selectedItems: state.selectedItems
  };
}

export default connect(select)(ProductsList);


