import React from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
import CommentBlock from './CommentBlock.jsx';
import { getCommentAction } from '../../actions/getCommentAction.jsx';


class CommentGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        commentList: undefined,
        error: undefined,
    };
  }

  componentWillMount() {
    const inputJson = {
      videoId: this.props.videoId
    };
    this.props.getCommentAction(inputJson);
  }

  render() {
    const loadingIcon = this.props.isLoading ? <BarLoader color={'#d9d9d9'} /> : null;
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
      <div className="comment-grid-section">
        <div className="loading-icon-sectiton">
          {loadingIcon}
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

const mapStateToProps = ({ CommentGrid }) => {
  const { isLoading, commentList, error } = CommentGrid;
  return { isLoading, commentList, error };
};

module.exports = connect(
  mapStateToProps, { getCommentAction }
)(CommentGrid);
