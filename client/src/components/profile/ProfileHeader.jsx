import React, { Component } from 'react';
import './ProfileHeader.css'

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="column profile-header">
      
        <div className="avatar-container profile-avatar">
          <img
            className="avatar"
            src={profile.user.avatar}
            alt=""
          />
        </div>
        <h1 className="card profile-name">{profile.user.name}</h1>
      </div>
    );
  }
}

export default ProfileHeader;