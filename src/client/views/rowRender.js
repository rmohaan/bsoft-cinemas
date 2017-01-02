/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const displayNames = {
  'productCode': 'Product Code',
  'productName': 'Product Name',
  'unit' : 'Units',
  'quantity': 'Quantity',
  'price': 'Price',
  'Total': 'Total Amount',
  'stockStatus': 'Status'
};

class RowRender extends React.Component {

constructor ()  {
  super();
  this.generateRowsForSelection = (list, cols) => this._generateRowsForSelection(list, cols);
  this.generateRowsForCheckout = (list, cols) => this._generateRowsForCheckout(list, cols);
  this.generateHeader = (cols) => this._generateHeader(cols);
}

_generateHeader (cols) {

  return cols.map((item, index) => {
            return <th key={index}> {displayNames[item]} </th>;
        });
}

_generateRowsForSelection(list, cols) {
  let thisRef = this;

  return list.map((item, index) => {
    // handle the column data within each row
    var statusClassName = classNames({
        'glyphicon glyphicon-ok-sign stockStatusAvailable': item.availability >= 1
      }, {
        'glyphicon glyphicon-exclamation-sign stockStatusNotAvailable': item.availability < 1
      }),
      cells = cols.map((colData, index) => {
        if (colData === 'stockStatus') {
          return <td key={index}>
            <span className={statusClassName}></span>
          </td>;
        } else if (colData !== 'quantity') {
          return <td key={index}>
            {item[colData]}
          </td>;
        } else if (colData === 'quantity') {
          return (
            <td key={index}>
              <span
                className="glyphicon glyphicon-minus-sign"
                style={{
                color: 'firebrick',
                fontSize: 'small',
                marginRight: '5px'
              }}
                onClick={(event) => thisRef.props.reduceOneItem(event, item)}></span>
              {item[colData]}
              <span
                className="glyphicon glyphicon-plus-sign"
                style={{
                color: 'forestgreen',
                fontSize: 'small',
                marginLeft: '5px'
              }}
                onClick={(event) => thisRef.props.addOneItem(event, item)}></span>
            </td>
          );
        }

      });
    return <tr key={index}> {cells} </tr>;
  });
}

_generateRowsForCheckout (list, cols) {

  return list.map((item, index) => {
      var cells = cols.map((colData, index) => {
          return <td key={index}> {item[colData]} </td>;
      });
      return <tr key={index}> {cells} </tr>;
  });
}

render () {
    let list = this.props.data,
        cols = this.props.cols,
        header = '';
    if (this.props.data.length > 0) {
      if (this.props.forCheckout) {
        list = this.generateRowsForCheckout(list, cols);
      }
      else {
        list = this.generateRowsForSelection(list, cols);
      }
    }

    if (cols.length > 0) {
      header = this.generateHeader(cols);
    }

    return (
      <div>
        <table className="table table-success">
         <thead>
              <tr>
                {header}
              </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
       </div>
    );
  }
}

export default RowRender;
