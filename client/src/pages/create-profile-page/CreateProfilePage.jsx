import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import CreateProfile from '../../components/create-profile/CreateProfile';
/*
Component styles
*/
import './CreateProfilePage.css';
import logo_white from '../../images/logo_white.png'

class CreateProfilePage extends Component {

  render() {
    return (
      <div>
        <div className="main">
          <div className="auth-header">
            <img className="auth-logo" src={logo_white} alt="logo" />
            <h1 className="auth-title">Quickplay</h1>
          </div>
          <CreateProfile history={this.props.history} />
        </div>
      </div>
    )
  }
}

export default (CreateProfilePage);