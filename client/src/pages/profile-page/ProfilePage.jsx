import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileMain from '../../components/profile/Profile';
import Spinner from '../../common/Spinner';
import { getProfileByHandle, getProfileByUserId } from '../../actions/profileActions';

import './ProfilePage.css'

class ProfilePage extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
    if (this.props.match.params.userId) {
      this.props.getProfileByUserId(this.props.match.params.userId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <ProfileHeader profile={profile} />
          <ProfileMain profile={profile}/>
        </div>
      );
    }

    return (
      <div className="main profile-container">
        {profileContent}
      </div>
    );
  }
}

ProfilePage.propTypes = {
  getProfileByHandle: PropTypes.func,
  getProfileByUserId: PropTypes.func,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle, getProfileByUserId })(ProfilePage);