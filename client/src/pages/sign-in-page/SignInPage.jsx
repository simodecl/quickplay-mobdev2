import React, { Component } from 'react';

/*
Libraries
*/


/*
Material UI
*/


/*
Components
*/
import SignIn from '../../components/sign-in/SignIn';

/*
Component styles
*/
import './SignInPage.css';
import logo_white from '../../images/logo_white.png'

class SignInPage extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <div className="auth-header">
            <img className="auth-logo" src={logo_white} alt="logo" />
            <h1 className="auth-title">Quickplay</h1>
          </div>
          <SignIn history= {this.props.history} />
        </div>
      </div>
    )
  }
}

export default (SignInPage);