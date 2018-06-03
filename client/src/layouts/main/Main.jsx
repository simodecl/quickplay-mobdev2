import React, { Component } from 'react';

/*
Libraries
*/
import { Redirect, Route, Switch } from 'react-router-dom';

/*
Material UI
*/
import './Main.css';

/*
Components
*/
import Header from '../../components/header/Header';
import Offcanvas from '../../components/offcanvas';
import PrivateRoute from '../../common/PrivateRoute';

/*
Page components
*/
import HomePage from '../../pages/home-page/HomePage';
import SettingsPage from '../../pages/settings-page/SettingsPage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import PostPage from '../../pages/post-page/PostPage';
import PostsPage from '../../pages/posts-page/PostsPage';
import SignInPage from '../../pages/sign-in-page/SignInPage';
import SignOutPage from '../../pages/sign-out-page/SignOutPage';
import SignupPage from '../../pages/signup-page/SignupPage';
import ProfilePage from '../../pages/profile-page/ProfilePage';
import ProfilesPage from '../../pages/profiles-page/ProfilesPage';
import CreateProfilePage from '../../pages/create-profile-page/CreateProfilePage';


class Main extends Component {
  render() {    
    return (
      <div>
        <Offcanvas />
        <Header />
        <Switch>
          <PrivateRoute exact path='/' component={HomePage}/>
          <PrivateRoute exact path='/settings' component={SettingsPage}/>
          <Redirect from='/posts/general' to='/posts' strict/>
          <Route exact path='/posts' component={PostsPage}/>
          <Route exact path='/posts/:category' component={PostsPage}/>
          <Route exact path='/post/:id' component={PostPage}/>
          <Route path='/signin' component={SignInPage}/>
          <Route path='/signout' component={SignOutPage}/>
          <Redirect from="/signout" to="/signin"/>
          <Route path='/signup' component={SignupPage}/>
          <Route exact path="/profiles" component={ProfilesPage} />
          <Route exact path="/profiles/:term" component={ProfilesPage} />
          <Route exact path="/profile/:handle" component={ProfilePage} />
          <Route exact path="/profile/user/:userId" component={ProfilePage} />
          <PrivateRoute exact path="/create-profile" component={CreateProfilePage} />
          <Route path="*" component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}

export default Main;
