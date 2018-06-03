import { POST_CREATION_ERROR, GET_POSTS, POST_LOADING, GET_COMMENTS, CREATE_COMMENT, COMMENT_ERROR } from '../constants';
import axios from 'axios';

export const createPost = (postData, category, history) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .post(`/api/v1/posts/${category}`, postData, {headers: { "Authorization": token}})
    .then(res => window.location.reload())

    .catch(err =>
      dispatch({
        type: POST_CREATION_ERROR,
        payload: "Could not create post"
      })
    );
};

export const getPostsByCategory = category => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/v1/posts/category/${category}`)
    .then(res => 
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/v1/posts/`)
    .then(res => 
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Post loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

export const likePost = (postId) => dispatch =>{
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .patch(`/api/v1/posts/like/${postId}`, postId,{headers: { "Authorization": token }})
    .then(res => window.location.reload(true))
    .catch(err =>
      dispatch({
        type: POST_CREATION_ERROR,
        payload: err.response.data
      })
    );
};

export const likeComment = (commentId) => dispatch =>{
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .patch(`/api/v1/comments/like/${commentId}`, commentId,{headers: { "Authorization": token }})
    .then(res => window.location.reload(true))
    .catch(err =>
      dispatch({
        type: COMMENT_ERROR,
        payload: err.response.data
      })
    );
};

export const getComments = (postId) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .get(`/api/v1/comments/${postId}`, postId,{headers: { "Authorization": token }})
		.then(res => 
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMMENTS,
        payload: null
      })
    );
}

export const createComment = commentData => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .post(`/api/v1/comments`, commentData, {headers: { "Authorization": token}})
    .then(res => 
      dispatch({
        type: CREATE_COMMENT,
				payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: CREATE_COMMENT,
				payload: null
      })
    );
}

export const softdeletePost = (postId) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .patch(`/api/v1/posts/${postId}/softdelete`, postId,{headers: { "Authorization": token }})
    .then(res => window.location.reload(true))
    .catch(err =>
      dispatch({
        type: POST_CREATION_ERROR,
        payload: err.response.data
      })
    );
}
export const restorePost = (postId) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .patch(`/api/v1/posts/${postId}/softundelete`, postId,{headers: { "Authorization": token }})
    .then(res => window.location.reload(true))
    .catch(err =>
      dispatch({
        type: POST_CREATION_ERROR,
        payload: err.response.data
      })
    );
}

export const deletePost = (postId) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .delete(`/api/v1/posts/${postId}`,{headers: { "Authorization": token }})
    .then(res => window.location.reload(true))
    .catch(err =>
      dispatch({
        type: POST_CREATION_ERROR,
        payload: err.response.data
      })
    );
}

export const deleteComment = (commentId) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .patch(`/api/v1/comments/${commentId}/softdelete`, commentId,{headers: { "Authorization": token }})
    .then(res => window.location.reload(true))
    .catch(err =>
      dispatch({
        type: COMMENT_ERROR,
        payload: err.response.data
      })
    );
}
export const restoreComment = (commentId) => dispatch => {
  const token = JSON.parse(localStorage.getItem("mobdev2_auth")).token
  axios
    .patch(`/api/v1/comments/${commentId}/softundelete`, commentId,{headers: { "Authorization": token }})
    .then(res => window.location.reload(true))
    .catch(err =>
      dispatch({
        type: COMMENT_ERROR,
        payload: err.response.data
      })
    );
}