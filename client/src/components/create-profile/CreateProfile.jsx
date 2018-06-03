
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { createProfile } from '../../actions/profileActions';

import './CreateProfile.css'

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      bio: '',
      games: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      bio: this.state.bio,
      games: this.state.games
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
        <div className="card auth-form-container">
            <h2 className="form-title">Create profile</h2>
            <form className="auth-form" noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
                placeholder="Handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
                icon="fa fa-address-book"
                info="This is a handle used to link your profile. This is required."
            />
            <TextAreaFieldGroup
                placeholder="About"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                icon="fa fa-book"
                info="Fill in additional information, like your favorite character or rank, here."
            />
            <TextFieldGroup
                placeholder="Games"
                name="games"
                value={this.state.games}
                onChange={this.onChange}
                error={errors.games}
                icon="fa fa-check"
                info="List the games you're playing here. Separate them with a comma, no spaces needed."
            />
            <input type="submit" value="Create profile" className="button auth-button" />
            </form>
        </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);