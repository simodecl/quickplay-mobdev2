import {
    GET_PROFILE,
    GET_PROFILES,
    GET_CURRENT_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_STEAMID
  } from '../constants';
  
  const initialState = {
    profile: null,
    profiles: null,
    current_profile: null,
    loading: false,
    steamid: null
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case PROFILE_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_PROFILE:
        return {
          ...state,
          profile: action.payload,
          loading: false
        };
        case GET_CURRENT_PROFILE:
        return {
          ...state,
          current_profile: action.payload,
          loading: false
        };  
      case GET_PROFILES:
        return {
          ...state,
          profiles: action.payload,
          loading: false
        };
      case CLEAR_CURRENT_PROFILE:
        return {
          ...state,
          profile: null
        };
      case GET_STEAMID:
        return {
          ...state,
          steamid: action.payload
        };
      default:
        return state;
    }
  }