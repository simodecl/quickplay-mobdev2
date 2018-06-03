import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner';
import ProfileItem from '../../components/profiles/ProfileItem';
import { getProfiles } from '../../actions/profileActions';
import './ProfilesPage.css'

class ProfilesPage extends Component {
  constructor(props) {
		super(props);

		this.state = {
			term: '',
			profilesFound: [],
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault()
		this.props.history.push(`/profiles/${this.state.term}`)
		window.location.reload()
	}
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
        if (this.props.match.params.term) {
          const realTerm =  this.props.match.params.term.toLowerCase().replace('%20', ' ')
          const filteredProfiles = profiles.filter((profile) => {
            return profile.user.name.toLowerCase().includes(realTerm);
          });
          if (filteredProfiles.length > 0) {
            profileItems = filteredProfiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ));
          } else {
            profileItems = <h4>No profiles found...</h4>;
          }
        } else {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
        };
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="main profiles">
        <h1>Profiles</h1>
        <p>Browse and connect with other gamers!</p>
        <form onSubmit={this.onSubmit} className="search-form">
          <label className="search">
            <i className="fa fa-search"></i>
            <input type="text" name="term" placeholder="Search profile" onChange={this.onChange} value={this.state.term} />
          </label>
        </form>
        {profileItems}
      </div>
    );
  }
}

ProfilesPage.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(ProfilesPage);
