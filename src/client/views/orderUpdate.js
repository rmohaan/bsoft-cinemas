/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};
class OrderUpdate extends React.Component {
  constructor () {
    super();
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
  }

  componentDidMount () {
  }

  render() {
    console.log(this.props.list)
    return (
      <div> testing </div>
      );
  }
}


function select (state) {
  return {
    list: state.productsList
  };
}

export default connect(select)(OrderUpdate);

