import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import SignUp from '../../components/sign-up/SignUp';
/*
Component styles
*/
import './SignupPage.css';
import logo_white from '../../images/logo_white.png'

class SignupPage extends Component {

  render() {
    return (
      <div>
        <div className="main">
          <div className="auth-header">
            <img className="auth-logo" src={logo_white} alt="logo" />
            <h1 className="auth-title">Quickplay</h1>
          </div>
          <SignUp />
        </div>
      </div>
    )
  }
}

export default (SignupPage);