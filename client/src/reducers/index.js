import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import offcanvasReducer from './offcanvasReducer';
import postReducer from './postReducer';
import profileReducer from './profileReducer';
import errReducer from './errReducer'
import commentReducer from './commentReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  offcanvas: offcanvasReducer,
  post: postReducer,
  comment: commentReducer,
  profile: profileReducer,
  error: errReducer
});