/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './header';
import Footer from './footer';
import * as actions from '../actions';

class CustomerInfo extends React.Component {
  constructor(props) {
    super(props);
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
    this.state = {
        name: ''
    };

    this.handleNameChange = (event) =>  this._handleNameChange(event);
    this.submitCustomerInfo = (event) => this._submitCustomerInfo(event);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  _handleNameChange(event) {
    this.setState({
        name: event.target.value
    });
  }

  _submitCustomerInfo (event) {
    alert('Customer Info submitted');
    event.preventDefault();
    let customerData = {
        name: this.state.name, 
        customerId: this.props.orderInfo.customerId, 
        orderId: this.props.orderInfo.orderId, 
        totalAmount: this.props.orderInfo.totalAmount
    };
    this.props.dispatch(actions.submitCustomerInfo(customerData));
  }


 
render () {
    return (
       
      <div className="container-fluid">
       <Header />
        <div className="row">
          <div className="col-md-12">
              <div style={{marginTop: '10px'}}>
                <div className="form-group row">
                    <label htmlFor="inputCustomerName" className="col-sm-2 col-form-label">Customer Name</label>
                        <div className="col-sm-10">
                            <input type="text" 
                                    className="form-control" 
                                    id="inputCustomerName" 
                                    placeholder="Enter the customer name" 
                                    value={this.state.name}
                                    onChange={this.handleNameChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="inputPhone" className="col-sm-2 col-form-label">Phone #</label>
                        <div className="col-sm-10">
                            <input type="phone" 
                                    className="form-control" 
                                    id="inputPhone" 
                                    placeholder="Enter the phone number" 
                                    value={this.props.orderInfo.customerId}
                                    readOnly />
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="inputAge" className="col-sm-2 col-form-label">Age </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="inputAge" placeholder="Enter the age" value={0} readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="inputGender" className="col-sm-2 col-form-label">Gender </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputGender" placeholder="Enter the gender" value="Not applicable" readOnly/>
                        </div>
                    </div>
                     <div className="form-group row">
                    <label htmlFor="inputMarital" className="col-sm-2 col-form-label">Marital Status </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputMarital" placeholder="Enter the marital status" value="Not applicable" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail" placeholder="Enter the email id" value="admin@nearme.com" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="inputAddressStreet" className="col-sm-2 col-form-label">Door & Street name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputAddressStreet" placeholder="Enter the door number & street" value="Not applicable" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="inputAddressArea" className="col-sm-2 col-form-label">Area name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputAddressArea" placeholder="Enter the area" value="Not applicable" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="inputAddressDistrict" className="col-sm-2 col-form-label">District name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputAddressDistrict" placeholder="Enter the district" value="Not applicable" readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="inputAddressState" className="col-sm-2 col-form-label">State</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputAddressState" placeholder="Enter the state" value="Not applicable" readOnly />
                        </div>
                    </div>
                    <div className="form-group row">
                    <label htmlFor="inputAddressPincode" className="col-sm-2 col-form-label">Pincode </label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id="inputAddressPincode" placeholder="Enter the pincode" value={600001} readOnly/>
                        </div>
                    </div>
                    <div className="form-group row" style={{float: 'right'}}>
                        <div className="offset-sm-2 col-sm-10">
                            <button type="submit" className="btn btn-primary" onClick={(event)=> this.submitCustomerInfo(event)}>Submit</button>
                        </div>
                    </div>
              </div>
          </div>
         </div>
       <Footer />
      </div>
    );
  }
}

function select (state) {
  return {
    orderInfo: state.orderInfo
  };
}

export default connect(select)(CustomerInfo);


