/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component {
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
      <footer>
          <div className="container">
          <p className="text-footer">
            <a href='/'> nearMe.in </a> &copy; 2016.  All rights reserved. 
          </p>
          </div>
     </footer>
    );
  }
}