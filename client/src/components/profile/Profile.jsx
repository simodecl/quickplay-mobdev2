import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Profile.css';

class ProfileMain extends Component {
  
  render() {
    const { profile } = this.props.profile;
    return (
      <div className="card profile-body">
        <h3>Games</h3>
        <ul className="row profile-games">
            {profile.games.map((game, i) => {
                return <li className="profile-game" key={i}>{game}</li>;
              })}
        </ul>
        <h3>About</h3>
        <div>{profile.bio}</div>
        <h3>Gamertags</h3>
        <div className="column">
          {profile.gamertags.map((tag, i) => (
              <div key={tag._id}>{tag.platform} - {tag.name}</div>
          ))}
        </div>
      </div>
    );
  }
}



ProfileMain.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(ProfileMain);