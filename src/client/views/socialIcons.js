/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class SocialIcons extends React.Component {

render () {
  
    return (
        <div className="container">
            <a href="https://www.facebook.com/mmohaan"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
            <a href="https://twitter.com/rmohaan"><i id="social-tw" className="fa fa-twitter-square fa-3x social"></i></a>
            <a href="https://plus.google.com/+rmohaan"><i id="social-gp" className="fa fa-google-plus-square fa-3x social"></i></a>
            <a href="mailto:mohaan.raja@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
        </div>
    );
  }
}