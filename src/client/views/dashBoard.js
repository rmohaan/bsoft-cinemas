/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import Griddle from 'griddle-react';
import SearchBar from './searchBar';

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
    "columnName": "Stock_Position",
    "order": 3,
    "locked": false,
    "visible": true,
    "displayName": "Item Location"
  },
  {
    "columnName": "Availability",
    "order": 4,
    "locked": false,
    "visible": true,
    "displayName": "Qty Available"
  },
  {
    "columnName": "Quantity",
    "order": 5,
    "locked": false,
    "visible": true,
    "displayName": "Unit"
  },
  {
    "columnName": "Price",
    "order": 6,
    "locked": false,
    "visible": true,
    "displayName": "Price"
  }];

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
  }

  componentDidMount () {
    this.props.dispatch(actions.fetchMoqList());
  }
   _customFilterFunction (items, query) {
    console.log("items: ", items);
    console.log("query: ", query);
  }

render () {
  console.log("testing")
    console.log(this.props.moqList)
    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div>
              <Griddle results={this.props.moqList} 
                  tableClassName="table table-hover" 
                  showFilter={true}
                  enableInfiniteScroll={true}
                  resultsPerPage={10}
                  bodyHeight={500}
                  useFixedHeader={true}
                  columnMetadata={columnMetaData}
                  columns={["Product_Code", "Product_Name", "Stock_Position", "Availability", "Quantity", "Price"]}
                  filterPlaceholderText="Search Item Code" 
                  useCustomFilterComponent={true} 
                  customFilterComponent={SearchBar} 
                  customFilterer={this.customFilterFunction} />
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
    moqList: state.moqList
  };
}

export default connect(select)(Dashboard);

