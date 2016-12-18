/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
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
      <div className="container">
         <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/dashboard">FMCG</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="/purchase">Purchase</a></li>
                <li><a href="#">Profile</a></li>
              </ul>
            </div>
          </div>
         </nav>
      </div>
    );
  }
}