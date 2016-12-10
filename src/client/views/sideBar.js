/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class SideBar extends React.Component {
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
  }

render () {
    
    return (
        <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
                <li className="active"><a href="#">Components <span className="sr-only">(current)</span></a></li>
                <li> <a href="#"> Sample Stores </a> </li>
            </ul>
        </div>
    );
  }
}