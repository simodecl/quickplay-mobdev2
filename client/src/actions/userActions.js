import axios from 'axios';

import {
  GET_ERRORS
} from '../constants';

// Update user
export const updateUser = (userData, history) => dispatch => {
    const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
    axios
      .patch('/api/v1/user/update', userData, {headers: { "Authorization": token}})
      .then(res => {
        const profile = JSON.parse(localStorage.getItem("profile"));
        profile.user.name = res.data.name
        localStorage.setItem('profile', JSON.stringify(profile))
        window.location.reload()
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };