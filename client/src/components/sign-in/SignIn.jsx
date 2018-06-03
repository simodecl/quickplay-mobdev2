import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignIn.css';


/*
Libraries
*/
import FacebookLogin from 'react-facebook-login';

/*
State management
*/
import { connect } from 'react-redux';
import { signInActionFacebookStrategy, signinUser} from '../../actions/authActions';



/*
Configuration & Components
*/
import config from '../../config';
import TextFieldGroup from '../../common/TextFieldGroup';


class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.authenticated) {
      this.props.history.push('/profiles');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.authenticated) {
      this.props.history.push('/profiles');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.signinUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  facebookResponse = (response) => {
    this.props.signInFacebook(response.accessToken, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="card auth-form-container">
        <h2 className="form-title">Sign in</h2>
        <form onSubmit={this.onSubmit } className="formSignIn auth-form">
          <TextFieldGroup
            placeholder="Email Address"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            icon="fa fa-envelope"
          />
          <TextFieldGroup
            placeholder="Password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChange}
            error={errors.password}
            icon="fa fa-lock"
          />
          <input type="submit" value="Sign in" className="button auth-button" />
        </form>
        <div className="facebook-button-wrapper">
          <FacebookLogin
            appId={config.FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.facebookResponse}
            textButton="Sign in with Facebook"
            cssClass="button auth-button facebook-button"
            icon="fa fa-facebook-square" />
          </div>  
      </div>
    );  
  }
}

SignIn.propTypes = {
  signinUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.auth.errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signinUser: (data) => dispatch(signinUser(data)),
    signInFacebook: (accessToken, history) => dispatch(signInActionFacebookStrategy(accessToken, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);