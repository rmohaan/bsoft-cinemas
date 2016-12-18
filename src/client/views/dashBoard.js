/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import SearchBar from './searchBar';
import moment from 'moment';
import { Link } from 'react-router';

let moqColumnMetaData = [
  {
    "columnName": "Product_Name",
    "order": 1,
    "locked": false,
    "visible": true,
    "displayName": "Name"
  },
  {
    "columnName": "Quantity",
    "order": 2,
    "locked": false,
    "visible": true,
    "displayName": "Unit"
  },
  {
    "columnName": "Availability",
    "order": 3,
    "locked": false,
    "visible": true,
    "displayName": "Qty Available"
  }],
  customerColumnMetadata =[
    {
      "columnName": "name",
      "order": 1,
      "locked": false,
      "visible": true,
      "displayName": "Name"
    },
    {
      "columnName": "createdOn",
      "order": 1,
      "locked": false,
      "visible": true,
      "displayName": "Purchase Date"
    },
    {
      "columnName": "totalAmount",
      "order": 1,
      "locked": false,
      "visible": true,
      "displayName": "Purchase Amount"
    }
  ];

class Dashboard extends React.Component {
  constructor () {
    super();
    this.state = {
      links: ''
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    this.customFilterFunction = (items, query) => this._customFilterFunction (items, query);
    this.formatCustomersList = (list) => this._formatCustomersList (list);
  }

   _customFilterFunction (items, query) {
    console.log("items: ", items);
    console.log("query: ", query);
  }

  _formatCustomersList (list) {
    // <Link to={`/orders/${item.customerId}`} > {item.name} </Link>
    list.map((item) => { 
      item.createdOn = moment(item.createdOn).format('DD MMM YYYY, hh:mm a'); 
      // item.name = '<a> ${item.name} </a>';
    });
    return list;
  }

render () {
  console.log("testing")
    console.log(this.props.moqList)
    let customersList = this.props.customersList.length > 0 ? this.formatCustomersList(this.props.customersList) : this.props.customersList;
    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
              <Griddle results={this.props.moqList} 
                  tableClassName="table table-hover" 
                  showFilter={true}
                  enableInfiniteScroll={true}
                  resultsPerPage={10}
                  bodyHeight={500}
                  useFixedHeader={true}
                  columnMetadata={moqColumnMetaData}
                  columns={["Product_Name", "Quantity", "Availability"]}
                  filterPlaceholderText="Search Item Code" 
                  useCustomFilterComponent={true} 
                  customFilterComponent={SearchBar} 
                  customFilterer={this.customFilterFunction} />
          </div>
          <div className="col-md-6">
              <Griddle results={customersList} 
                  tableClassName="table table-hover" 
                  showFilter={true}
                  enableInfiniteScroll={true}
                  resultsPerPage={10}
                  bodyHeight={500}
                  useFixedHeader={true}
                  columnMetadata={customerColumnMetadata}
                  columns={["name", "createdOn", "totalAmount"]}
                  filterPlaceholderText="Search customers" 
                  useCustomFilterComponent={true} 
                  customFilterComponent={SearchBar} 
                  customFilterer={this.customFilterFunction} />
          </div>
        </div>
        </div>
    );
  }
}

function select (state) {
  console.log(state);
  return {
    moqList: state.moqList,
    customersList: state.customersList
  };
}

export default connect(select)(Dashboard);

