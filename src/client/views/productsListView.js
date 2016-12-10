/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Header from './header';
import Griddle from 'griddle-react';
import SearchBar from './searchBar';
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

class ProductsList extends React.Component {
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
    this.selectedItems = [];
  }

  componentDidMount () {
  }

  _customFilterFunction (items, query) {
    console.log("items: ", items);
    console.log("query: ", query);
    // return items.filter((item) => {

    //   for (var key in flat) {
    //     if (String(flat[key]).toLowerCase().indexOf(query.toLowerCase()) >= 0) return true;
    //   };
    //   return false;
    // });
}

_updateRowChange (row, event) {
  console.log("row value", row);
  console.log("Event", event);
  var exis = JSON.parse(JSON.stringify(this.state.selectedItems)),
      item = exis.find(item => row.props.data.Product_Code === item.Product_Code);
  if (!item) {
    exis.push({
      ...row.props.data,
      quantity: 1
    });
    // row.props.data.Availability -= 1;
  } else {
    if (item.Availability > 1) {
      // row.props.data.Availability -= 1;
      item.Availability -= 1;
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

_updateRowChange2 (row, event) {
  // console.log("row value", row);
  // console.log("Event", event);
   // console.log(this.state.selectedItems);
  var exis = JSON.parse(JSON.stringify(this.state.selectedItems)),
      item = exis.find(x => x.Product_Code == row.props.data.Product_Code);
   console.log(row.props.data);
   if (item.Availability > 1) {
      row.props.data.Availability -= 1;
      item.Availability -= 1;
      item.quantity += 1;
    } else {
      // we can add a table {OUT OF STOCK} and push the items popping here as well
      // while updating the table, we need to ensure if the user enters 10 items initially
      // and removing the 10 items from selected, we need to remove that item in off stocks 
      // list as well
      alert ("Item out of stock!");
    }
      
  this.setState ({
    selectedItems: exis
  })
}

_setSelectedItems (items, event) {
  // var items = this.state.selectedItems;
  event.preventDefault();
  this.props.dispatch(actions.setSelectedItems({items}));
  this.props.dispatch(push('/checkout'));

}

render () {
    console.log(this);
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
             <Griddle results={this.props.list} 
                  tableClassName="table table-hover" 
                  showFilter={true}
                  enableInfiniteScroll={true}
                  resultsPerPage={5}
                  bodyHeight={500}
                  useFixedHeader={true}
                  columnMetadata={columnMetaData}
                  columns={["Product_Code", "Product_Name", "Stock_Position", "Availability", "Quantity", "Price"]}
                  filterPlaceholderText="Search Item Code" 
                  useCustomFilterComponent={true} 
                  customFilterComponent={SearchBar} 
                  customFilterer={this.customFilterFunction} 
                  onRowClick={this.updateRowChange}/>
          </div>
          <div className="col-md-6">
            <div style={{marginTop: '25px'}} >
              <strong> <i> Items to checkout </i> </strong>
              <Griddle results={this.state.selectedItems} 
                      tableClassName="active" 
                      enableInfiniteScroll={true}
                      bodyHeight={500}
                      useFixedHeader={true}
                      columnMetadata={columnMetaData}
                      columns={["Product_Name", "Quantity", "Price", "quantity"]}
                      filterPlaceholderText="Search Item Code" 
                      onRowClick={this.updateRowChange2}
                      noDataMessage={"Select Items from the left pane to start purchasing"} />
                <a className="btn btn-success" style={{float: 'right', marginTop: '5px'}} onClick={(event) => this.setSelectedItems(this.state.selectedItems, event)}>Checkout</a> 
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
    list: state.productsList,
    selectedItems: state.selectedItems
  };
}

export default connect(select)(ProductsList);


