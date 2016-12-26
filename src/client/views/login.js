/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import classNames from 'classnames';

class Login extends React.Component {
    constructor () {
        super();
        this.state = {
            phone: '',
            password: ''
        };
        this.authenticateUser = () => this._authenticateUser();
        this.handlePhoneInput = (event) => this._handlePhoneInput(event);
        this.handlePasswordInput = (event) => this._handlePasswordInput(event);
    }
//  <div className="loginForm">
//          <form action="/login">
//             <div className="container">
//                 <label><b>Username</b></label>
//                 <input type="text" placeholder="Enter Username" name="uname" required />

//                 <label><b>Password</b></label>
//                 <input type="password" placeholder="Enter Password" name="pwd" required />
                    
//                 <button type="submit">Login</button>
//                 <input type="checkbox" checked="checked" /> Remember me
//             </div>

//             <div className="container" style={{'backgroundColor':'#f1f1f1'}}>
//                 <button type="button" className="cancelbtn">Cancel</button>
//                 <span className="pwd">Forgot <a href="#">password?</a></span>
//             </div>
//         </form>
//       </div>


_authenticateUser () {
    this.props.dispatch(actions.authenticateUser({
        phone: this.state.phone, 
        password: this.state.password
    }));
}

_handlePhoneInput (event) {
    this.setState({
        phone: event.target.value
    });
}

_handlePasswordInput (event) {
    this.setState({
        password: event.target.value
    });
}

render () {
    let message = this.props.authenticationDetails.authenticationMessage,
        isAuthenticationSuccessful = this.props.authenticationDetails.isAuthenticationSuccess,
        className = {
          errorClass: classNames({'hide': isAuthenticationSuccessful}, {'alert alert-danger': !isAuthenticationSuccessful})
        };
    return (
      <div className="loginForm">
        <div className="container">
            <fieldset>
              <legend>Authentication Details</legend>
                <label><b><span className="glyphicon glyphicon-user"> Username </span></b></label>
                <div>
                <input type="text"  name="phone" value={this.state.phone} onChange={this.handlePhoneInput} required />
                </div>
                <label><b><span className="glyphicon glyphicon-lock"> Password </span></b></label>
                <input type="password" placeholder="Enter password" name="password" value={this.state.password} onChange={this.handlePasswordInput} required />
                    
                <button type="btn btn-success" onClick={this.authenticateUser}>Login</button>
                <div className={className.errorClass}>{message}</div>
                <button type="button" className="cancelbtn">Cancel</button>
                <span className="pwd">Forgot <a href="#">password?</a></span>
            </fieldset>
        </div>
      </div>
    );
  }
}

function select(state) {
    return {
        authenticationDetails: state.authenticationDetails
    };
}

export default connect(select)(Login);