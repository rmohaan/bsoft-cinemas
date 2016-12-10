/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Dashboard extends React.Component {
  constructor () {
    super();
    this.state = {
      links: ''
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
  }

render () {
    
    return (
        <div className="row placeholders">
            <div className="col-xs-6 col-sm-3 placeholder">
                <h4>Label</h4>
                <span className="text-muted">MoQ details will come here...</span>
            </div>
            
        </div>
    );
  }
}


