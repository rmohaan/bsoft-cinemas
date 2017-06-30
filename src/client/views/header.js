/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

class Header extends React.Component {

render () {

    return (
      <div className="container">
         <nav className="navbar navbar-fixed-top" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">BSoft Cinemas</a>
            </div>
          </div>
         </nav>
      </div>
    );
  }
}

export default Header;
