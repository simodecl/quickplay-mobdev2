import { AUTHENTICATED, AUTHENTICATION_ERROR, UNAUTHENTICATED, GET_ERRORS } from '../constants';
import axios from 'axios';
import setAuthToken from '../utilities/setAuthToken';

export const signinUser = userData => dispatch => {
  axios
    .post('/api/v1/auth/local', userData)
    .then(res => {
      
      dispatch({ 
        type: AUTHENTICATED,
        payload: res.data
      });
      localStorage.setItem('mobdev2_auth', JSON.stringify(res.data));
      // Set token to Auth header
      const token = res.data.token;
      setAuthToken(token);
    })
    .catch(err =>
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      })
    );
};


export function signInActionFacebookStrategy(accessToken, history) {
  return async (dispatch) => {
    try {
      const postData = new Blob([JSON.stringify({access_token: accessToken}, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: postData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/auth/facebook', options);
      const responseJson = await response.json();

      dispatch({ 
        type: AUTHENTICATED,
        payload: responseJson
      });
      localStorage.setItem('mobdev2_auth', JSON.stringify(responseJson));

      // Set token to Auth header
      const token = responseJson.token;
      setAuthToken(token);

    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid access token'
      });
    }
  };
}

export function signInActionSteamStrategy(identifier, history) {
  return async (dispatch) => {
    try {
      const postData = new Blob([JSON.stringify({identifier: identifier}, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: postData,
          mode: 'cors',
          cache: 'default'
      };
      const response = await fetch('/api/v1/auth/steam', options);
      const responseJson = await response.json();

      dispatch({ 
        type: AUTHENTICATED,
        payload: responseJson
      });
      localStorage.setItem('mobdev2_auth', JSON.stringify(responseJson));

    } catch(error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid access token'
      });
    }
  };
}

export function signOutAction() {
  localStorage.clear();
  // Set Auth header to false
  setAuthToken(false);
  return {
    type: UNAUTHENTICATED
  };
}

// Signup User
export const signupUser = (userData, history) => dispatch => {
  axios
    .post('/api/v1/signup', userData)
    .then(res => history.push('/signin'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};