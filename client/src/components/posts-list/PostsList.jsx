
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostsByCategory, getPosts, likePost, deletePost, softdeletePost, restorePost } from '../../actions/postActions';

import Spinner from '../../common/Spinner';
import './PostsList.css';

class PostsList extends Component {

	componentWillMountOrReceiveProps() {
		if (this.props.postCategory) {
		this.props.getPostsByCategory(this.props.postCategory)
		} else {
		this.props.getPosts();
		}
	}

	componentDidMount() {
		if (this.props.postCategory) {
			this.props.getPostsByCategory(this.props.postCategory)
			} else {
			this.props.getPosts();
		}
		
	}

	render() {
		function getCat(el) {
			return <a href={`/posts/${el._category.name}`} className="post-category">{el._category.name}</a>;
		}

		
		const slicerecent = () => {
	
			if (this.props.sliceLength) {
				return this.props.posts.slice(0,this.props.sliceLength)
			} else {
				return this.props.posts
			}
		}
		
		if (this.props.posts) {
			return (
				<div>
					{slicerecent().map((element, index) => (
						<section className="card post column" key={element._id}>
							{(this.props.user.user.isAdmin || element.author._id === this.props.user.user.id)
										? <div className="options">
											<label>
												<i className="fas fa-ellipsis-v" />
												<input type="checkbox" name="options" value="toggle" />
												<div className="option-list card">
													{element.deleted_at
														? <div className="column"><span onClick={() => this.props.restorePost(element._id)}>Restore</span><span onClick={() => this.props.deletePost(element._id)}>Delete</span></div>
														: <div className="column"><span onClick={() => this.props.softdeletePost(element._id)}>Softdelete</span><span onClick={() => this.props.deletePost(element._id)}>Delete</span></div>
													}
												</div>
											</label>
										</div>
										: ''}
							<div className="row post-head">
								<a href={`/post/${element._id}`} className="post-title">{element.title}</a>
								<div>{getCat(element)}</div>
							</div>
							<div className="row post-user">
								<div>by <a href={`/profile/user/${element.author._id}`}>{element.author.name}</a></div>
								<div className="avatar-container-icon">
									<img src={element.author.avatar} alt="" className="avatar-icon" />
								</div>
							</div>
							<div className="post-body">{element.deleted_at ? '-deleted-' : element.body}</div>
							<div className="actions">
								<span onClick={() => this.props.likePost(element._id)} className={`likes ${element.likes.indexOf(this.props.user.user.id) > -1
									? 'liked'
									: ''}`}>
									<i className="fa fa-heart"></i>{element.likes.length}
								</span>
								<a href={`/post/${element._id}`} className="comments"><i className="fa fa-comments"></i>Join discussion</a>
							</div>
						</section>
					))}
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

PostsList.propTypes = {
	getPostsByCategory: PropTypes.func.isRequired,
	getPosts: PropTypes.func.isRequired,
	likePost: PropTypes.func,
	deletePost: PropTypes.func,
	softdeletePost: PropTypes.func,
	restorePost: PropTypes.func,
	posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	posts: state.post.posts,
	user: state.auth.auth
})


export default connect(mapStateToProps, { getPostsByCategory, getPosts, likePost, deletePost, softdeletePost, restorePost })(PostsList);