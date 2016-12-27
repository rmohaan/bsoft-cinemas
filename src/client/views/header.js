/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor () {
    super();
    this.handleLogout = (event) => this._handleLogout(event);
  }

  _handleLogout (event) {
    event.preventDefault();
    this.props.dispatch(actions.logoutUser());
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
                <li><a onClick={this.handleLogout}>Logout</a></li>
              </ul>
            </div>
          </div>
         </nav>
      </div>
    );
  }
}

export default connect()(Header);