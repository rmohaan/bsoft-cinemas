/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import moment from 'moment';

class PanelRender extends React.Component {

constructor ()  {
  super();
  this.generateOrderItemsInPanel = (order) => this._generateOrderItemsInPanel(order);
}

_generateOrderItemsInPanel (order) {
  let cols = ['Product_Name', 'quantity', 'Total'],
      list = order.items;
     return list.map((item, index) => {
        var cells = cols.map((colData, index) => {
            if (colData === 'Product_Name') {
              return <span key={index} className="productName"> {item[colData]} </span>;
            }
            return <span key={index} className="genericStyle"> {item[colData]} </span>;
        });
        return <div key={index} className="panelItems" > {cells} </div>;
     });
}

render () {

 return (
      <div className="panel panel-success">
        <div className="panel-heading" data-toggle="collapse" data-target={`#${this.props.data._id}`}>
          <strong>
            {moment(this.props.data.createdOn).format('DD MMM YYYY, hh:mm a')}
            <span style={{float: 'right'}}>
              {this.props.data.totalAmount}
            </span>
          </strong>
        </div>
        <div id={this.props.data._id} className="panel-body collapse">
          {this.generateOrderItemsInPanel(this.props.data)}
        </div>
      </div>
    );
  }
}

export default PanelRender;
