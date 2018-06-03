import axios from 'axios';
import config from '../config.json'
import {
  GET_PROFILE,
  GET_CURRENT_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  GET_STEAMID
} from '../constants';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .get('/api/v1/profile',{headers: { "Authorization": token}})
    .then(res =>  {
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: res.data
      });
      localStorage.setItem('profile', JSON.stringify(res.data))
    })
    .catch(err =>
      dispatch({
        type: GET_CURRENT_PROFILE,
        payload: {}
      })
    );
};

// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/v1/profile/handle/${handle}`)
    .then(res => 
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Get profile by user Id
export const getProfileByUserId = userId => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/v1/profile/user/${userId}`)
    .then(res => 
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};
// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .post('/api/v1/profile', profileData, {headers: { "Authorization": token}})
    .then(res => {
      localStorage.setItem('profile', JSON.stringify(res.data))
      history.push(`/profile/${res.data.handle}`)})
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// update Profile
export const updateProfile = (profileData, history) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .patch('/api/v1/profile/update', profileData, {headers: { "Authorization": token}})
    .then(res => {
      const profile = JSON.parse(localStorage.getItem("profile"));
      profile.bio = res.data.bio
      profile.games = res.data.games
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

// update Gamertags
export const updateTags = (tags, history) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .patch('/api/v1/gamertags', tags, {headers: { "Authorization": token}})
    .then(res => {
      console.log(res.data)
      const profile = JSON.parse(localStorage.getItem("profile"));
      profile.gamertags = res.data.gamertags
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

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/v1/profiles')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Upload image
export const uploadImage = (profileData, history) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .patch('/api/v1/upload', profileData, {headers: { "Authorization": token, 'content-type': 'multipart/form-data'}})
    .then(res => window.location.reload())
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
    axios
      .delete('/api/v1/profile',{headers: { "Authorization": token}})
      .then(res =>
        dispatch({
          type: GET_CURRENT_PROFILE,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
// Delete account & profile
export const deleteTag = (tag) => dispatch => {
  if (window.confirm(`Are you sure you want to delete the ${tag} tag? This can NOT be undone!`)) {
    const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
    axios
      .delete(`/api/v1/gamertag/${tag}`,{headers: { "Authorization": token}})
      .then(res => {
        const profile = JSON.parse(localStorage.getItem("profile"));
        if (tag === 'steam') profile.gamertags = profile.gamertags.filter((obj) => { return obj.platform !== 'Steam' });
        if (tag === 'xbox') profile.gamertags = profile.gamertags.filter((obj) => { return obj.platform !== 'Xbox' });
        if (tag === 'playstation') profile.gamertags = profile.gamertags.filter((obj) => { return obj.platform !== 'Playstation' });
        if (tag === 'battlenet') profile.gamertags = profile.gamertags.filter((obj) => { return obj.platform !== 'Battle.net' });
        if (tag === 'epic') profile.gamertags = profile.gamertags.filter((obj) => { return obj.platform !== 'Epic Games' });
        if (tag === 'riot') profile.gamertags = profile.gamertags.filter((obj) => { return obj.platform !== 'Riot Games' });
        localStorage.setItem('profile', JSON.stringify(profile))
        window.location.reload()
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

export const getSteamId = (username) => dispatch => {
  fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config.steamApiKey}&vanityurl=${username}`, {
    mode: 'no-cors'})
  .then((response) => {
    console.log(response)
    return response.text()
    .then((text) => {
      return text ? JSON.parse(text) : {}
    })
  })
  .then((data) => {
    console.log(data)
      dispatch({
        type: GET_STEAMID,
        payload: data
      })
  })
    .catch(err =>
      dispatch({
        type: GET_STEAMID,
        payload: err
      })
    );
}
