import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import Settings from '../../components/settings/Settings';
import './SettingsPage.css';

class SettingsPage extends Component {

  componentWillMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const {profile} = this.props;
    let setting;
    if (profile) {
      setting = <Settings profile={profile} />;
    } else {
      setting = "Couldn't load settings page, please try again."
    }

    return (
      <div className="main">
        <h1 className="title">Settings</h1>
        {setting}
      </div>
    );
  }
}

SettingsPage.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,

});

export default connect(mapStateToProps, { getCurrentProfile })(
  SettingsPage
);