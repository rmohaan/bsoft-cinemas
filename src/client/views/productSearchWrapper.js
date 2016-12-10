/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Header from './header';
import ProductsList from './productsListView';
import * as actions from '../actions/index';

class ProductSearch extends React.Component {
  constructor () {
    super();
    this.state = {
      links: ''
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }

  componentDidMount () {
    this.props.dispatch(actions.fetchProductsList());
  }


render () {
    
    return (
      <div className="">
        <Header />
        <ProductsList />
      </div>
    );
  }
}

export default connect()(ProductSearch);
