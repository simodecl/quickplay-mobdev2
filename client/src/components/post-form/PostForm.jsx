import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../../common/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import { createPost } from '../../actions/postActions';
import './PostForm.css';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newPost = {
      title: this.state.title,
      body: this.state.body
    };

    if (this.props.postCategory) {
      this.props.createPost(newPost, this.props.postCategory, this.props.history);
    } else { this.props.createPost(newPost, 'general', this.props.history); }
    this.setState({ title: '' }, { body: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="card">
        <form onSubmit={this.onSubmit} className="column create-post-form">
          <TextFieldGroup
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
            error={errors.title}
            customCss="create-post-field"
          />
          <TextAreaFieldGroup
            placeholder="Message"
            name="body"
            value={this.state.body}
            onChange={this.onChange}
            error={errors.body}
            customCss="create-post-area"
          />
          <button type="submit" className="button post-button ">
            Create post
          </button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { createPost })(PostForm);