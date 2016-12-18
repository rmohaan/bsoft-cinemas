/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';
import RowRender from './rowRender';
import * as actions from '../actions';

class ProductsCheckout extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedItems: [],
      phoneNumber: ''
    };
    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    this.handlePhoneNumber = (event) => this._handlePhoneNumber(event);
    this.updateRowChange2 = (row, event) => this._updateRowChange2(row, event);
    this.modifiedList = (items) => this._modifiedList(items);
    this.getTotalAmount = (items) => this._getTotalAmount(items);
    this.submitAction = (event, list, totalAmount) => this._submitAction(event, list, totalAmount);
  }

  _modifiedList(items) {
    items.map((item) => { item.Total = item.Price * item.quantity; });
    return items;
  }

  _getTotalAmount(items) {
    let totalAmt = 0;
    items.map((item) => { totalAmt += item.Price * item.quantity; });
    return totalAmt;
  }

  _submitAction(event, selectedItemList, totalAmount) {
    event.preventDefault();
    let products = this.props.list,
        stocksUpdate = [],
        moqList = [],
        phoneNumber = this.state.phoneNumber;

    if (phoneNumber) {
      for (const selectedItem of selectedItemList) {
      Object.keys(products).forEach(function (key) {
        let productObj = products[key];
        if (selectedItem.Product_Code === productObj.Product_Code) {
          var jsonData = {};
          jsonData["Product_Code"] = selectedItem.Product_Code;
          jsonData["Availability"] = selectedItem.Availability;
          if (selectedItem.Availability <= 5) {
            productObj.Availability = selectedItem.Availability;
            moqList.push(productObj);
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

     let toInsert = [...selectedItemList]; //{...list, totalAmount: totalAmount};
     this.props.dispatch(actions.submitOrder({
       ...toInsert,
       totalAmount: totalAmount,
       customerId: phoneNumber,
       stocks_update: stocksUpdate,
       moq_update: moqList
      }));
    } else {
      alert ("Phone number is mandatory");
    }
    
}

_handlePhoneNumber (event) {
  this.setState({
    phoneNumber: event.target.value
  })
}

render () {

    let list = this.modifiedList(this.props.selectedItems.items),
        showTotalAmount = this.getTotalAmount(list);

    return (
      <div className="container-fluid">
       <Header />
        <div className="row">
          <div className="col-md-12" style={{ marginTop:'5px'}}>
           <RowRender data={list}
                      cols={['Product_Code', 'Product_Name', 'Quantity', 'quantity', 'Price', 'Total']}
                      forCheckout={true} />
           <div style={{ marginTop:'5px'}} className="panel panel-default checkout">
                <div className="panel-heading">
                  <label className="col-form-label"> Enter Customer phone number </label>
                  <span style={{float: 'right'}}>
                    Total Amount Rs. {showTotalAmount}
                  </span>
                </div>
                <div className="panel-body" style={{marginLeft: '48px'}}>
                  <input type="text"
                        className="form-control"
                        value={this.state.phoneNumber}
                        onChange={(event) => this.handlePhoneNumber(event)}  />
                  <button className="btn btn-success"
                          style={{marginTop: '5px', float: 'right'}}
                          onClick={(event) => this.submitAction(event, list, showTotalAmount)} >
                    Submit
                  </button>
                </div>
            </div>
          </div>
         </div>
       <Footer />
      </div>
    );
  }
}

function select(state) {
  return {
    list: state.productsList,
    selectedItems: state.selectedItems
  };
}

export default connect(select)(ProductsCheckout);


