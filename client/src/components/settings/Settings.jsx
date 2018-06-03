import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAccount, uploadImage, updateProfile, updateTags, deleteTag } from '../../actions/profileActions';
import { updateUser } from '../../actions/userActions';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import Spinner from '../../common/Spinner';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      name: '',
      bio: '',
      games: '',
      steam: '',
      xbox: '',
      playstation: '',
      battlenet: '',
      epic: '',
      riot: '',
      file: '',
      errors: {}
    };
    
    this.onChange = this.onChange.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmitImage = this.onSubmitImage.bind(this); 
    this.onSubmitName = this.onSubmitName.bind(this);
    this.onSubmitProfile = this.onSubmitProfile.bind(this);
    this.onSubmitTags = this.onSubmitTags.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmitImage(e) {
    e.preventDefault();

    const { file } = this.state
    let formData = new FormData();

    formData.append('file', file);
  
    this.props.uploadImage(formData, this.props.history);
    console.log(this.state);
  }

  onChangeImage = (e) => {
    this.setState({file: e.target.files[0]});
    console.log(this.state);
  }

  onSubmitName(e) {
    e.preventDefault();

    const data = {
      name: this.state.name
    };

    this.props.updateUser(data, this.props.history);
  }

  onSubmitProfile(e) {
    e.preventDefault();

    const data = {
      bio: this.state.bio,
      games: this.state.games
    };

    this.props.updateProfile(data, this.props.history);
  }

  onSubmitTags(e) {
    e.preventDefault();

    const data = {
      steam: this.state.steam,
      xbox: this.state.xbox,
      playstation: this.state.playstation,
      battlenet: this.state.battlenet,
      epic: this.state.epic,
      riot: this.state.riot
    };

    this.props.updateTags(data, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  componentDidMount() {
    if (this.props.profile.current_profile) {
        console.log(this.props.profile.current_profile)
        this.cp = this.props.profile.current_profile
        const tags = this.cp.gamertags
        
        const steam = tags.filter((tag) => {
        return tag.platform === "Steam";
        });
        const xbox = tags.filter((tag) => {
        return tag.platform === "Xbox";
        });
        const playstation = tags.filter((tag) => {
        return tag.platform === "Playstation";
        });
        const battlenet = tags.filter((tag) => {
        return tag.platform === "Battle.net";
        });
        const epic = tags.filter((tag) => {
        return tag.platform === "Epic Games";
        });
        const riot = tags.filter((tag) => {
        return tag.platform === "Riot Games";
        });
        this.setState({name: this.cp.user.name})
        this.setState({bio: this.cp.bio})
        this.setState({games: this.cp.games.join()})

        if (steam.length === 1) this.setState({steam: steam[0].name})
        if (xbox.length === 1) this.setState({xbox: xbox[0].name})
        if (playstation.length === 1) this.setState({playstation: playstation[0].name})
        if (battlenet.length === 1) this.setState({battlenet: battlenet[0].name})
        if (epic.length === 1) this.setState({epic: epic[0].name})
        if (riot.length === 1) this.setState({riot: riot[0].name})
    }
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  onDeleteClickTag(e) {
    e.preventDefault();
    this.props.deleteTag(e.target.name);
  }

  render() {
    const { errors } = this.state;

    const { user } = this.props.auth;
    const { current_profile, loading } = this.props.profile;
    let settingsContent;

    if (current_profile === null || loading) {
      settingsContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(current_profile).length > 0) {
        settingsContent = ( <div>
          <p className="">
            Welcome <Link to={`/profile/${current_profile.handle}`}>{user.name}</Link>
          </p>
          <div className="card column settings-container">  
            <section className="row settings-row">
              <div className="column settings-item">
                <h2>Avatar</h2>
                <div className="row">
                  <div className="avatar-container settings-avatar">
                    <img src={current_profile.user.avatar} alt="" className="avatar" />
                  </div>
                    <form onSubmit={this.onSubmitImage} className="column file-form">
                        <input onChange={this.onChangeImage} className="button file-button" name="file" type="file"/>
                        <input type="submit" value="Upload" className="button settings-button" />
                    </form>  
                </div>  
              </div>
              <div className="column settings-item">
                <h2>Name</h2>
                <form onSubmit={this.onSubmitName} className="column settings-name-form">
                  <TextFieldGroup
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                      icon="fa fa-user"
                  />
                  <input type="submit" value="Update" className="button settings-button" />
                </form>  
              </div>      
            </section>
            <section className="row settings-items">
              <div className="column fullwidth">
                <h2>Profile info</h2>
                <form onSubmit={this.onSubmitProfile} className=" settings-profile-form">
                  <div className="row settings-profile-fields">
                    <TextAreaFieldGroup
                        placeholder="About"
                        name="bio"
                        value={this.state.bio}
                        onChange={this.onChange}
                        error={errors.bio}
                        icon="fa fa-book"
                    />
                    <TextFieldGroup
                        placeholder="Games"
                        name="games"
                        value={this.state.games}
                        onChange={this.onChange}
                        error={errors.games}
                        icon="fa fa-check"
                        info="Don't use spaces! Separate your games with a comma."
                    />
                  </div>  
                  <input type="submit" value="Update" className="button settings-button" />
                </form>
              </div>  
            </section>
            <section className="row settings-items">
            <div className="column fullwidth">
                <h2>Gamertags</h2>
                <form onSubmit={this.onSubmitTags} className=" settings-tags-form">
                  <div className="row settings-tags-fields">
                    <div className="column tags-column">
                      <TextFieldGroup
                          placeholder="Steam"
                          name="steam"
                          value={this.state.steam}
                          onChange={this.onChange}
                          error={errors.gamertags}
                          icon="fab fa-steam"
                          deletebuttonvalue="X"
                          onDeleteClick={this.onDeleteClickTag.bind(this)}
                          
                      />
                      <TextFieldGroup
                          placeholder="Xbox"
                          name="xbox"
                          value={this.state.xbox}
                          onChange={this.onChange}
                          error={errors.gamertags}
                          icon="fab fa-xbox"
                          deletebuttonvalue="X"
                          onDeleteClick={this.onDeleteClickTag.bind(this)}
                      />
                      <TextFieldGroup
                          placeholder="Playstation"
                          name="playstation"
                          value={this.state.playstation}
                          onChange={this.onChange}
                          error={errors.gamertags}
                          icon="fab fa-playstation"
                          deletebuttonvalue="X"
                          onDeleteClick={this.onDeleteClickTag.bind(this)}
                      />
                    </div>
                    <div className="column tags-column">
                      <TextFieldGroup
                          placeholder="Battlenet"
                          name="battlenet"
                          value={this.state.battlenet}
                          onChange={this.onChange}
                          error={errors.gamertags}
                          icon="fa-battlenet"
                          deletebuttonvalue="X"
                          onDeleteClick={this.onDeleteClickTag.bind(this)}
                      />
                      <TextFieldGroup
                          placeholder="Epic Games"
                          name="epic"
                          value={this.state.epic}
                          onChange={this.onChange}
                          error={errors.gamertags}
                          icon="fa-epic"
                          deletebuttonvalue="X"
                          onDeleteClick={this.onDeleteClickTag.bind(this)}
                      />
                      <TextFieldGroup
                          placeholder="Riot Games"
                          name="riot"
                          value={this.state.riot}
                          onChange={this.onChange}
                          error={errors.gamertags}
                          icon="fa-riot"
                          deletebuttonvalue="X"
                          onDeleteClick={this.onDeleteClickTag.bind(this)}
                      />
                    </div>  
                  </div>  
                  <input type="submit" value="Update" className="button settings-button" />
                </form>
              </div>  
            </section>
            
          </div>
          <button
            onClick={this.onDeleteClick.bind(this)}
            className="button"
          >
            Delete profile
          </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        settingsContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div>
        {settingsContent}
      </div>
    );
  }
}

Settings.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  updateTags: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth.auth
});

export default connect(mapStateToProps, {deleteAccount, uploadImage, updateUser, updateProfile, updateTags, deleteTag })(
  Settings
);