import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { RingLoader } from 'react-spinners';
import CommentBlock from './CommentBlock.jsx';
import { getCommentAction } from '../../actions/getCommentAction.jsx';
import postComment from '../../api/postComment.jsx';


class CommentGrid extends React.Component {
  state = {
    isGetLoading: false,
    commentList: undefined,
    error: undefined,
  }

  componentWillMount() {
    document.addEventListener('keypress', this.handleEnterKey);
  }

  componentDidMount() {
    this.props.getCommentAction({ videoId: this.props.videoId });
    document.removeEventListener('keypress', this.handleEenterKey);
  }

  onSubmit=() => {
    const userJSON = JSON.parse(sessionStorage.getItem('empty-video-web-user-session'));
    const inputJson = {
      commentContent: this.refs.comment.value,
      videoId: this.props.videoId,
      userId: userJSON.user.userId
    };
    postComment.postComment(inputJson, 
      userJSON.userToken,
      userJSON.userSessionId
    ).then(() => {
      this.props.getCommentAction({ videoId: this.props.videoId });
      this.refs.comment.value = '';
    }).catch((err) => {
      alert(`failed post comment${err}`);
    });
  }

  handleEnterKey=(e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onSubmit();
    }
  };

  render() {
    const token = sessionStorage.getItem('empty-video-web-user-session');
    const commentUploadBox = (!token || token.length <= 0) ? 
      ( 
        <Link to="SignIn">Sign In To Leave a Comment</Link>
      ) : 
      (
        <div className="comment-box">
          <input 
            className="form-control comment-content"
            placeholder="Press <Enter> to leave a comment"
            onKeyPress={this.handleEnterKey}
            ref="comment" 
          />
        </div>
    );
    const getLoadingIcon = this.props.isGetLoading ? <RingLoader color={'#d9d9d9'} /> : null;
    const errText = (this.props.error === undefined) ?
      null : (
        <div className="badge badge-danger">
          {this.props.error}
        </div>
      );
    const commentList = (this.props.commentList === undefined) ? null :
      this.props.commentList.map((comment) => {
      return <CommentBlock key={comment.commentId} commentInfo={comment} />
    });

    return (
      <div className="comment-section">
        <div className="comment-write-block-section">
          {commentUploadBox}
        </div>
        <div className="comment-grid-section">
          <div className="loading-icon-sectiton">
            {getLoadingIcon}
          </div>
          <div className="err-text-section">
            {errText}
          </div>
          <div className="comment-list-section">
            {commentList}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ commentGrid }) => {
  const { isGetLoading, commentList, error } = commentGrid;
  return { isGetLoading, commentList, error };
};

module.exports = connect(
  mapStateToProps, { getCommentAction }
)(CommentGrid);
