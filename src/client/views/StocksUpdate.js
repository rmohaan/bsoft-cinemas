/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { push } from 'react-router-redux';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class StocksUpdate extends React.Component {
  
  constructor () {
    super();
     this.state = {
      updatedStockItems: [],
      stockUpdateCheck: ''
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
    this.onBeforeSaveCell = (row, cellName, cellValue) => this._onBeforeSaveCell (row, cellName, cellValue);
    this.onAfterSaveCell = (row, cellName, cellValue) => this._onAfterSaveCell (row, cellName, cellValue);
    this.setUpdatedStockItems = (items, event) => this._setUpdatedStockItems (items, event);
  }

  _setUpdatedStockItems (items, event) {
    event.preventDefault();
    this.props.dispatch(actions.setUpdatedStockItems({items}));
     if (this.props.page === 'StocksUpdate')
      this.props.dispatch(push('/stockCheckout'));
    else{
      this.props.dispatch(actions.submitUpdatedStockItems({items: items}));
    }
    
  }
  _onAfterSaveCell (row, cellName, cellValue) {
       var exis = JSON.parse(JSON.stringify(this.state.updatedStockItems)),
          item = exis.find(item => row.Product_Code === item.Product_Code);
          if (!item) {
            exis.push({
                ...row
              });
          }else{
            item.Availability = cellValue;
          }
          this.setState ({
            updatedStockItems: exis
          })
          console.log(this.state.updatedStockItems)
  }

  _onBeforeSaveCell (row, cellName, cellValue) {
    if(cellValue <=0)
        return false;
    else
        return true;
  }
  componentDidMount () {
    if (this.props.page === 'StocksConfirm'){
    this.setState({
        updatedStockItems: this.props.updatedStockItems.items
      });
  }
  }

  render() {
    let pList;
    if (this.props.page === 'StocksUpdate')
      pList = this.props.list;
    else
      pList = this.props.updatedStockItems.items;
    let isDisabled = this.state.updatedStockItems.length > 0 ? false : true;
    const cellEditProp = {
        mode: 'click',
        blurToSave: true,
        beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
        afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
    };
    return (
      <div>
      {pList.length > 0 ?
          (
                  <BootstrapTable pagination data={ pList } cellEdit={ cellEditProp } maxHeight='433px' search >
                    <TableHeaderColumn dataField='Product_Code'editable={ false }  dataSort columnTitle isKey={ true }>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='Product_Name' width='400' dataSort columnTitle editable={ false }>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='Quantity' dataSort columnTitle editable={ false }>Product Price</TableHeaderColumn>
                    <TableHeaderColumn dataField='Availability' dataSort={ true } columnTitle >Availability</TableHeaderColumn>
                  </BootstrapTable>
          ) :
          (
              <div>
                <div className="loader" height='100px' width='100px'>Loading...</div>
              </div>
          )

      }
      <button className="btn btn-success"
                  style={{float: 'right', marginTop: '5px'}}
                  onClick={(event) => this.setUpdatedStockItems(this.state.updatedStockItems, event)}
                  disabled={isDisabled} >
                  {this.props.page === "StocksConfirm" ? 'Confirm' : 'Checkout'}
      </button> 
       </div> 
      ); 
  }
}

function select (state) {
  return {
    list: state.productsList,
    updatedStockItems: state.updatedStockItems
  };
}
export default connect(select)(StocksUpdate);

