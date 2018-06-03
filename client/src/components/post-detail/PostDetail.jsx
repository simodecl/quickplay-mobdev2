import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createComment, likePost } from '../../actions/postActions'

import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import Spinner from '../../common/Spinner';
import CommentList from './CommentList';
import './PostDetail.css';

class PostDetail extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      post: undefined,
      body: '',
			comments: 0
    }

    this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    fetch(`/api/v1/posts/${this.props.postId}`)
      .then( response => response.json())
      .then( item => this.setState({ post: item })); 

    fetch(`/api/v1/comments/${this.props.postId}`)
			.then(response => response.json())
			.then(item => this.setState({ comments: item.length }));
  }

  onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

  onSubmit(e) {
		e.preventDefault()
		const comment = {
			post_id: this.props.postId,
			body: this.state.body,
			author: this.props.auth.user.id
		}
		if (this.state.body) this.props.createComment(comment)
		document.querySelector('.comment-form form textarea').value = '';
	}

  render() {
    function getCat(el) {
			return <a href={`/posts/${el._category.name}`} className="post-category">{el._category.name}</a>;
		}
    console.log(this.state)
    if(this.state.post) {
      return (
        <div>
          <section className="card post column">
            <div className="row post-head">
              <a href={`/post/${this.state.post._id}`} className="post-title">{this.state.post.title}</a>
              <div>{getCat(this.state.post)}</div>
            </div>
            <div className="row post-user">
              <div>by {this.state.post.author.name}</div>
              <div className="avatar-container-icon">
                <img src={this.state.post.author.avatar} alt="" className="avatar-icon" />
              </div>
            </div>
            <div className="post-body">{this.state.post.deleted_at ? '-deleted-' : this.state.post.body}</div>
            <div className="actions">
              <span onClick={() => this.props.likePost(this.state.post._id)} className={`likes ${this.state.post.likes.indexOf(this.props.auth.user.id) > -1
                ? 'liked'
                : ''}`}>
                <i className="fa fa-heart"></i>{this.state.post.likes.length}
              </span>
              <span className="comments"><i className="fa fa-comments"></i>{this.state.comments}</span>
            </div>
          </section>
          <section className="card comment-form">
						<form className="row" onSubmit={this.onSubmit}>
							<TextAreaFieldGroup name="body" placeholder="Type your comment" onChange={this.onChange} value={this.state.body} customCss="create-comment"></TextAreaFieldGroup>
							<button className="button comment-button" type="submit" value="Submit"><i className="fas fa-comment-alt"></i></button>
						</form>
					</section>
          <CommentList postId={this.props.postId} />
        </div>
      );
    } else {
      return (
        <div>
          <Spinner />
        </div>
      )
    }   
  }
}

PostDetail.propTypes = {
  createComment: PropTypes.func.isRequired,
  likePost: PropTypes.func
}

const mapStateToProps = state => ({
	auth: state.auth.auth
})

export default connect(mapStateToProps, { createComment, likePost })(PostDetail);