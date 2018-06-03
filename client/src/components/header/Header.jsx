import React, { Component } from 'react';


/*
Libraries
*/
import {Link} from 'react-router-dom';

/*
State management
*/
import { connect } from 'react-redux';
import { toggleOffcanvas } from '../../actions/offcanvasActions';

/*
Material UI
*/
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

import IconMenu from '@material-ui/icons/Menu';
import IconAccountCircle from '@material-ui/icons/AccountCircle';

/*
Component styles
*/
import './Header.css'
import logo_white from '../../images/logo_white.png'


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    }

    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
  }

  handleHamburgerClick(e) {
    e.preventDefault();
    this.props.hamburgerClick();
  }

  handleUserMenuOpen = (ev) => {
    this.setState({ anchorEl: ev.currentTarget });
  }

  handleUserMenuClose = () => {
    this.setState({ anchorEl: null });
  }

  userLinks() {
    if (this.props.authenticated) {
      return [
        <MenuItem onClick={() => this.handleUserMenuClose()} component={Link} to="/settings" key={1}>Profile</MenuItem>,
        <MenuItem onClick={() => this.handleUserMenuClose()} component={Link} to="/signout" key={2}>Sign out</MenuItem>,
      ];
    }
    return [
      <MenuItem onClick={() => this.handleUserMenuClose()} component={Link} to="/signin" key={1}>Sign in</MenuItem>,
      <MenuItem onClick={() => this.handleUserMenuClose()} component={Link} to="/signup" key={2}>Sign up</MenuItem>,
    ];
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static">
        <Toolbar className="header">
          <IconButton className="menuButton" color="inherit" aria-label="Menu" onClick={ this.handleHamburgerClick }>
            <IconMenu />
          </IconButton>
          <a href="/"><img src={logo_white} className="header-logo" alt="logo" /></a>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={(ev) => this.handleUserMenuOpen(ev)}
              color="inherit"
            >
              <IconAccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={() => this.handleUserMenuClose()}
            >
              {this.userLinks()}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    offcanvasOpened: state.offcanvas.offcanvasOpened
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hamburgerClick: () => dispatch(toggleOffcanvas())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);