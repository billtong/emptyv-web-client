import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { RingLoader } from 'react-spinners';
import CommentBlock from './CommentBlock.jsx';
import { getCommentListAction } from '../../../actions/getCommentListAction';
import CommentAPI from '../../../api/comment';
import { getSessionTokenJson } from '../../../api/apiHelper';


class CommentGrid extends React.Component {
  state = {
    isGetLoading: false,
    commentList: undefined,
    error: undefined,
    isBlur: true,
    isForcus: false
  }

  componentWillMount() {
    document.addEventListener('keypress', this.handleEnterKey);
  }

  componentDidMount() {
    this.props.getCommentListAction({ videoId: this.props.videoId });
    document.removeEventListener('keypress', this.handleEenterKey);
  }

  handleEnterKey=(e) => {
    if (e.keyCode === 13 && this.state.isForcus && !this.state.isBlur) {
      const comment = this.refs.comment.value;
      this.refs.comment.value = '';
      const inputJson = {
        commentContent: comment,
        videoId: this.props.videoId,
        userId: getSessionTokenJson().user.userId
      };
      CommentAPI.postComment(inputJson)
      .then(() => {
        this.props.getCommentListAction({ videoId: this.props.videoId });
      })
      .catch((err) => {
        alert(`failed post comment${err}`);
      });
    }
  };

  ifForcus=() => {
    this.setState(prevState => ({
      ...prevState,
      isForcus: true,
      isBlur: false
    }));
  }

  ifBlur=() => {
    this.setState(prevState => ({
      ...prevState,
      isForcus: false,
      isBlur: true
    }));
  }

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
            id="comment-box"
            placeholder="Press <Enter> to leave a comment"
            type="text"
            onKeyPress={e => this.handleEnterKey(e)}
            onFocus={this.ifForcus}
            onBlur={this.ifBlur}
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
      return (
        <CommentBlock key={comment.commentId} commentInfo={comment} />
      );
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
  mapStateToProps, { getCommentListAction }
)(CommentGrid);
