import React, { Component } from 'react';

/*
Material UI
*/


/*
Components
*/
import PostForm from '../../components/post-form/PostForm';
import PostsList from '../../components/posts-list/PostsList';
import store from '../../store';

/*
Component styles
*/
import './PostsPage.css';

class PostsPage extends Component {

  render() {

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let postsTitle;
    if (this.props.match.params.category) {
      postsTitle = <h1 className="posts-title">{capitalizeFirstLetter(this.props.match.params.category)} posts</h1>
    } else { postsTitle = <h1 className="posts-title">General posts</h1> }

    let postForm;
		if(store.getState().auth.authenticated){
			postForm = <PostForm postCategory={this.props.match.params.category} history={this.props.history} />;
		}
    return (
      <div className="main posts-container">
        {postsTitle}
        {postForm}
        <PostsList postCategory={this.props.match.params.category} />
      </div>
    )
  }
}

export default (PostsPage);