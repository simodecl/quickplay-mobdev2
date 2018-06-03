import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getComments, likeComment, deleteComment, restoreComment } from '../../actions/postActions';

import utils from '../../utilities/utils';
import Spinner from '../../common/Spinner';

class CommentList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			body: ''
		}
	}


	componentWillMount() {
		this.props.getComments(this.props.postId);
	}

	render() {
		if (this.props.comments) {
			return (
				<div>
					{(this.props.comments.length > 0)
						? this.props.comments.map((comment, i) => (
							<section className="card comment-thread" key={comment._id}>
								<div className="comment">
									{(this.props.auth.user.isAdmin || comment.author._id === this.props.auth.user.id)
										? <div className="options">
											<label>
												<i className="fas fa-ellipsis-v" />
												<input type="checkbox" name="options" value="toggle" />
												<div className="option-list card">
													{comment.deleted_at
														? <span onClick={() => this.props.restoreComment(comment._id)}>Restore</span>
														: <span onClick={() => this.props.deleteComment(comment._id)}>Delete</span>
													}
												</div>
											</label>
										</div>
										: ''}
									<h3 className="author row">
										<div className="avatar-container-icon">
											<img src={comment.author.avatar || this.props.auth.user.avatar} alt="" className="avatar-icon" />
										</div>
										<a href={`/profile/user/${comment.author._id || this.props.auth.user.id}`}>{comment.author.name || this.props.auth.user.name}</a>
										<time className="timestamp" title={utils.formatDate(comment.created_at)} dateTime={utils.formatDate(comment.created_at)}>{utils.getTimeDifference(comment.created_at)}</time>
									</h3>
									<p>{comment.deleted_at ? '-deleted-' : comment.body}</p>
									<div className="actions">
										<span onClick={() => this.props.likeComment(comment._id)} className={`likes ${comment.likes.indexOf(this.props.auth.user.id) > -1
										? 'liked'
										: ''}`}><i className="fa fa-heart"></i>{comment.likes.length}</span>
									</div>
								</div>
							</section>))
						: <section className="light">There are no comments yet on this post! Be the first!</section>}
				</div>
			)
		} else {
			return (
				<div>
					<Spinner />
				</div>
			)
		}
	}
}

CommentList.propTypes = {
    getComments: PropTypes.func.isRequired,
    likeComment: PropTypes.func,
    deleteComment: PropTypes.func,
    restoreComment: PropTypes.func,
	comments: PropTypes.array
}

const mapStateToProps = state => ({
    comments: state.comment.comments,
    auth: state.auth.auth
})


export default connect(mapStateToProps, { getComments, likeComment, deleteComment, restoreComment })(CommentList);