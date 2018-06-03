import React, { Component } from 'react';

/*
Libraries
*/
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

/*
Material UI
*/
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './App.css';

/*
Layouts
*/
import Main from './layouts/main/Main';


/*
State management via Redux
*/
import store from './store';

/*
Auth state
*/
import { AUTHENTICATED, UNAUTHENTICATED, GET_CURRENT_PROFILE } from './constants';
const auth = localStorage.getItem('mobdev2_auth');
if(auth) {
  store.dispatch({ type: AUTHENTICATED, payload: JSON.parse(auth) });
} else {
  store.dispatch({ type: UNAUTHENTICATED });
}
const profile = localStorage.getItem('profile');
if(profile) {
  store.dispatch({ type: GET_CURRENT_PROFILE, payload: JSON.parse(profile) });
} else {
  store.dispatch({ type: GET_CURRENT_PROFILE, payload: null });
}

/*
Theme
*/
const theme = createMuiTheme();

class App extends Component {
  render() {    
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <Main />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
