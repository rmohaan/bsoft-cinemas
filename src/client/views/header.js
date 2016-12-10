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
     // <form className="navbar-form navbar-right">
              //   <input type="text" className="form-control" placeholder="Search..." />
              // </form>
    return (
      <div className="container">
         <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">FMCG</a>
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