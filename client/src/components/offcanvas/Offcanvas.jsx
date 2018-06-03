import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Libraries
*/
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

/*
State management
*/
import { connect } from 'react-redux';
import { closeOffcanvas } from '../../actions/offcanvasActions';

/*
Material UI
*/
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText} from 'material-ui/List';

/*
Styles
*/
import './Offcanvas.css';
const drawerWidth = 320;
const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    background: '#201c2b',
    color: '#FFF',
    border: '1px solid #2c2541'
  },
  navPrimary: {
    color: '#FFF'
  },
  toolbar: theme.mixins.toolbar,
});

class Offcanvas extends Component {

  constructor(props) {
    super(props);

    this.state = {
      backofficeLists: {
        postsOpen: false
      }
    };
  }

  toggleBackofficeLists = (list) => {
    this.setState(prevState => {
      const backofficeListsUpdate = prevState.backofficeLists;
      backofficeListsUpdate[list] = !backofficeListsUpdate[list];
      return {
        backofficeLists: backofficeListsUpdate
      }
    });
  }
  reload = () => {
    window.location.reload()
  }

  authLinks() {
    const { classes } = this.props;
    if (this.props.authenticated) {
      return [        
        <List key="0" component="nav">
          <section className="nav-user row">
            <div className="avatar-container-mini">
              <img src={this.props.auth.auth.user.avatar} alt="" className="avatar-mini" />
            </div>
            <p>{this.props.auth.auth.user.name}</p>
          </section>
          <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/profiles">
            <i style={{width: 20 + 'px'}} className="fa fa-users" />
            <ListItemText classes={{ primary: classes.navPrimary }} primary="Profiles" />
          </ListItem>
          <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/posts">
            <i style={{width: 20 + 'px'}} className="fa fa-lock" />
            <ListItemText classes={{ primary: classes.navPrimary }} primary="Posts" />
          </ListItem>
          <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/posts/overwatch">
            <ListItemText classes={{ primary: classes.navPrimary }} inset primary="Overwatch" />
          </ListItem>
          <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/posts/fortnite">
            <ListItemText classes={{ primary: classes.navPrimary }} inset primary="Fortnite" />
          </ListItem>
          <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/posts/csgo">
            <ListItemText classes={{ primary: classes.navPrimary }} inset primary="Csgo" />
          </ListItem>
          <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/settings">
            <i style={{width: 20 + 'px'}} className="fa fa-cog" />
            <ListItemText classes={{ primary: classes.navPrimary }} primary="Settings" />
          </ListItem>
          <div style={{width: '100%', background: '#6441A4', height: 1  + 'px'}} />
          <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/signout">
            <i style={{width: 20 + 'px'}} className="fa fa-user-times" />
            <ListItemText classes={{ primary: classes.navPrimary }} primary="Sign out" />
          </ListItem>
        </List>,
      ];
    }
    return [
      <List key="0" component="nav">
        <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/profiles">
          <ListItemText classes={{ primary: classes.navPrimary }} primary="Profiles" />
        </ListItem>
        <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/posts">
          <ListItemText classes={{ primary: classes.navPrimary }} primary="Posts" />
        </ListItem>
        <div style={{width: '100%', background: '#6441A4', height: 1  + 'px'}} />
        <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/signin">
          <i style={{width: 20 + 'px'}} className="fa fa-user-check" />
          <ListItemText classes={{ primary: classes.navPrimary }} primary="Sign in" />
        </ListItem>
        <ListItem button onClick={() => {this.props.closeClick(); this.reload()}} component={Link} to="/signup">
          <i style={{width: 20 + 'px'}} className="fa fa-user-plus" />
          <ListItemText classes={{ primary: classes.navPrimary }} primary="Sign up" />
        </ListItem>
      </List>,
    ];
  }

  

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        anchor="left"
        open={this.props.offcanvasOpened}
        onClose={(open) => {this.props.closeClick(); this.reload()}}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {this.authLinks()}
      </Drawer>
    )
  }
}

Offcanvas.propTypes = {
  offcanvasOpened: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    auth: state.auth,
    offcanvasOpened: state.offcanvas.offcanvasOpened
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeClick: () => dispatch(closeOffcanvas())
  };
};

const OffcanvasWithStyles = withStyles(styles, { withTheme: true })(Offcanvas);
export default connect(mapStateToProps, mapDispatchToProps)(OffcanvasWithStyles);