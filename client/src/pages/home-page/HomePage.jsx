import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


/*
Components
*/
import ProfileItem from '../../components/profiles/ProfileItem';
import PostsList from '../../components/posts-list/PostsList';
import Spinner from '../../common/Spinner';

/*
Actions
*/
import { getProfiles } from '../../actions/profileActions';

/*
Component styles
*/
import './HomePage.css';

class HomePage extends Component {

    componentDidMount() {
        this.props.getProfiles();
        }

    render() {
        const { profiles, loading } = this.props.profile;
        let profileItems;

        if (profiles === null || loading) {
        profileItems = <Spinner />;
        } else {
        if (profiles.length > 0) {
            profileItems = profiles.slice(0,3).map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
            ))
        } else {
            profileItems = <h4>No profiles found...</h4>;
        }
        }
        return (
        <div className="main posts-container">
            <h2>Recent posts</h2>
            <PostsList sliceLength="3"/>
            <h2>Recent profiles</h2>
            {profileItems}
        </div>
        )
    }
}

HomePage.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { getProfiles })(HomePage);