/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './header';
import Griddle from 'griddle-react';
import * as actions from '../actions';

var columnMetaData = [{
    "columnName": "Product_Code",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Code"
  },
  {
    "columnName": "Product_Name",
    "order": 2,
    "locked": false,
    "visible": true,
    "displayName": "Name"
  },
  {
    "columnName": "Quantity",
    "order": 3,
    "locked": false,
    "visible": true,
    "displayName": "Unit"
  },
  {
    "columnName": "quantity",
    "order": 4,
    "locked": false,
    "visible": true,
    "displayName": "Quantity"
  },
  {
    "columnName": "Price",
    "order": 5,
    "locked": false,
    "visible": true,
    "displayName": "Price"
  },
  {
    "columnName": "Total",
    "order": 6,
    "locked": false,
    "visible": true,
    "displayName": "Total Price"
  }];

class ProductsCheckout extends React.Component {
  constructor () {
    super();
    this.state = {
      selectedItems: []
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
    this.selectedItems = [];
    this.updateRowChange2 = (row, event) => this._updateRowChange2 (row, event);
    this.modifiedList = (items) => this._modifiedList (items);
    this.getTotalAmount = (items) => this._getTotalAmount (items);
    this.submitAction = (event, list, totalAmount) => this._submitAction (event, list, totalAmount);
  }

  componentDidMount () {
      // this.props.dispatch(actions.fetchSelectedProducts());
  }

  _modifiedList (items) {
      items.map((item) => { item.Total = item.Price * item.quantity; });
      return items;
  }

  _getTotalAmount (items) {
      let totalAmt = 0;
      items.map((item) => { totalAmt += item.Price * item.quantity; });
      console.log(totalAmt);
      return totalAmt;
  }

  _submitAction (event, selectedItemList, totalAmount) {
      event.preventDefault();
      console.log("submit button clicked", selectedItemList, totalAmount);

      console.log("list :" + this.props.list);
      let products=this.props.list;
      let stocksUpdate = [];
      for ( const arrValue of selectedItemList ) {
            console.log( arrValue ); // 'hello', 'world'
            Object.keys(products).forEach(function (key) {
              let productobj = products[key];
              if(arrValue.Product_Code === productobj.Product_Code){
                var jsonData = {};
                jsonData["Product_Code"] = arrValue.Product_Code;
                jsonData["Availability"] = arrValue.Availability;
                if(arrValue.Availability < 5){
                  console.log(productobj)
                }
                stocksUpdate.push(jsonData)
              }

            });
      }
      selectedItemList.map((item) => { 
          delete item.Product_Name; 
          delete item.Quantity;
          delete item._id;
          delete item.Availability;
          delete item.Price;
        });

      


     // let toInsert = {{Product_Code, quantity, Price}, ...list};
     console.log(stocksUpdate);
      let toInsert = [...selectedItemList]; //{...list, totalAmount: totalAmount};
      // console.log();
      this.props.dispatch(actions.submitOrder({...toInsert, totalAmount: totalAmount, stockts_update: stocksUpdate}));
  }

render () {
    console.log(this.props.selectedItems.items);
    let list = this.modifiedList(this.props.selectedItems.items),
        showTotalAmount = this.getTotalAmount(list);
    return (
       
      <div className="container-fluid">
       <Header />
        <div className="row">
          <div className="col-md-12">
             <Griddle results={list} 
                  tableClassName="table table-hover" 
                  enableInfiniteScroll={true}
                  resultsPerPage={10}
                  useFixedHeader={true}
                  columnMetadata={columnMetaData}
                  columns={["Product_Code", "Product_Name", "Quantity", "quantity", "Price", "Total"]} />

            <div style={{float:'right', width:'200px', marginTop:'5px'}} className="panel panel-default">
                <div className="panel-heading">Total Amount Rs. {showTotalAmount}</div>
                <div className="panel-body" style={{marginLeft: '48px'}}><button className="btn btn-success" onClick={(event) => this.submitAction(event, list, showTotalAmount)}>Submit</button></div>
            </div>
          </div>
      </div>
      </div>
    );
  }
}

function select (state) {
  return {
    list: state.productsList,
    selectedItems: state.selectedItems
  };
}

export default connect(select)(ProductsCheckout);


