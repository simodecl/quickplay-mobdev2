import { POST_CREATED, POST_CREATION_ERROR, GET_POSTS, POST_LOADING } from '../constants';

const initialState = {
  loading: false,
  posts: [],
  newPostCreated: false,
  newPost: undefined,
  error: undefined
}

function postReducer(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
    return {
      ...state,
      posts: action.payload
    };
    case POST_CREATED:
      return {
        ...state,
        newPostCreated: true,
        newPost: action.payload,
        loading: false
      };
    case POST_CREATION_ERROR:
      return {
        ...state,
        newPostCreated: false,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export default postReducer;