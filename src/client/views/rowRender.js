/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

class RowRender extends React.Component {

constructor ()  {
  super();
  this.generateRows = (list) => this._generateRows(list);
}

_generateRows (list) {
  console.log("generateRows",this);

  let cols = ['Product_Code', 'Product_Name', 'quantity', 'StockStatus'],
      thisRef = this;

  return list.map((item, index) => {
            // handle the column data within each row
            var statusClassName = classNames({'glyphicon glyphicon-ok-sign stockStatusAvailable': item.Availability >= 1}, 
                                             {'glyphicon glyphicon-exclamation-sign stockStatusNotAvailable': item.Availability < 1}),
                cells = cols.map((colData, index) => {
                if (colData === 'StockStatus') {
                  return <td key={index}> <span className={statusClassName}> </span> </td>;
                } else if (colData !== 'quantity') {
                  return <td key={index}> {item[colData]} </td>;
                } else if (colData === 'quantity') {
                  return ( 
                    <td key={index}> 
                      <span className="glyphicon glyphicon-minus-sign" 
                            style={{color: 'firebrick', fontSize: 'small', marginRight: '5px'}} 
                            onClick={(event) => thisRef.props.reduceOneItem(event, item)}>  
                      </span> 
                      {item[colData]}
                      <span className="glyphicon glyphicon-plus-sign" 
                            style={{color: 'forestgreen', fontSize: 'small', marginLeft: '5px'}} 
                            onClick={(event) => thisRef.props.addOneItem(event, item)}>  
                      </span> 
                      </td>);
                }
                
            });
            return <tr key={index}> {cells} </tr>;
        });
}

render () {
    console.log(this.props);
    let list = this.props.data.length > 0 ? this.generateRows(this.props.data) : this.props.data;
       

    return (
      <div>
        <table className="table table-success">
         <thead>
              <tr>
                <th>
                  Item Code
                </th>
                <th>
                  Product Name
                </th>
                <th>
                  Quantity
                </th>
                <th>
                  Availability
                </th>
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
