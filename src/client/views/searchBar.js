/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends React.Component {

constructor () {
    super();
    this.searchChange = (event) => this._searchChange(event);
    this.customFilterFunction = (items, query) => this._customFilterFunction (items, query);
}

_searchChange (event) {
    this.props.changeFilter(event.target.value);
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



render () {
    
    return (
         <div className="input-group" style={{width:'200%', marginBottom:'5px', marginTop: '5px'}}>
              <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
              <input id="msg" type="text" className="form-control" name="msg" placeholder="Search Items..." onChange={this.searchChange} />
         </div>
    );
  }
}

export default SearchBar;
