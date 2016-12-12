/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Footer from './footer';
import SideBar from './sideBar';
import Dashboard from './dashBoard';

export default class Home extends React.Component {
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
         <Header />
         <div className="container-fluid">
           <div className="row">
            <SideBar />
             <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
               <h1 className="page-header">Dashboard</h1>
                  <Dashboard />    
             </div>
           </div>
         </div>
         <Footer />
      </div>
    );
  }
}