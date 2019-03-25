import React from 'react';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import CommentBlock from './CommentBlock.jsx';


class CommentGrid extends React.Component {
  render() {
    const getLoadingIcon = this.props.isGetLoading ? <RingLoader color={'#d9d9d9'} /> : null;
    const errText = (!this.props.error) ?
      null : (
      <div className="badge badge-danger">
        {this.props.error}
      </div>
    );
    const commentList = (!this.props.commentList) ? null :
      this.props.commentList.map((comment, index) => {
        const { currPage, sizes } = this.props;
        if (index >= (currPage - 1) * sizes && index < currPage * sizes) {
          return (
            <CommentBlock key={comment.commentId} commentInfo={comment} />
          );
      }
    });

    return (
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
    );
  }
}

const mapStateToProps = ({ getCommentListReducer }) => {
  const { isGetLoading, commentList, error, currPage, sizes } = getCommentListReducer;
  return { isGetLoading, commentList, error, currPage, sizes };
};

export default connect(
  mapStateToProps, {}
)(CommentGrid);
