import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ProfileItem.css';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card profiles-card">
        <div className="column profile-card-column">
          <div className="column profiles-main">
            <div className="avatar-container">
              <img src={profile.user.avatar} alt="" className="avatar" />
            </div>
            <div className="column profiles-info">
              <h3>{profile.user.name}</h3>
              <p className="profiles-bio">{profile.bio}</p>
              <ul className="row profile-games">
                  {profile.games.map((game, i) => {
                      return <li className="profile-game" key={i}>{game}</li>;
                    })}
              </ul>
            </div>
          </div>
          <Link to={`/profile/${profile.handle}`} className="button view-profile">
             View profile
          </Link>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;