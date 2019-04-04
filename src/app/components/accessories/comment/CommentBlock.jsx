import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { formatDateTime } from '../../../utils/dateTools';
import { getSessionTokenJson } from '../../../api/apiHelper';
import { getCommentListAction, completeGetComment } from '../../../actions/getCommentListAction';
import { postComment } from '../../../api/comment';

class CommentBlock extends React.Component {
  state = {
    isOpenReply: false,
    isReplyArr: Array(this.props.commentInfo.length).fill(false)
  }

  //这个是comment的输入栏的提交法方法
  handleReplyClick = (e, replyCom) => {
    const comment = this.refs[`reply-${replyCom.commentId}`].value;
    if (!comment || comment === null || comment === '' || (typeof comment === 'string' && comment.trim().length === 0)) {
      alert('fill with something please...');
      return;
    }
    this.refs[`reply-${replyCom.commentId}`].value = '';
    const inputJson = {
      commentContent: comment,
      videoId: replyCom.videoId,
      userId: getSessionTokenJson().user.userId,
      commentParentId: replyCom.commentId
    };
    e.preventDefault();
    postComment(inputJson)
    .then(() => {
      this.props.completeGetComment();    //先让commentList清零来重新加载commentlist
      this.props.getCommentListAction({ videoId: replyCom.videoId });
    })
    .catch((err) => {
      alert(`failed post comment${err}`);
    });
  };

  handleUserClick = (e, userId) => {
    e.preventDefault();
    hashHistory.push(`UserPage/${userId}`);
  }

  render() {
    const commentData = this.props.commentInfo;
    const rootComment = commentData[0];
    const uploadDate = formatDateTime(parseInt(rootComment.commentDate));
    const rootReplayIndex = 0;
    const replyInput = this.state.isReplyArr[rootReplayIndex] ? (
      <div>
        <input
          className="reply-comment-input"
          id={rootComment.id}
          type="text"
          ref={`reply-${rootComment.commentId}`}
          placeholder="press enter to reply this comment"
        />
        <input 
          className="reply-comment-confirm"
          type="button"
          value="reply"
          onClick={e=>this.handleReplyClick(e, rootComment)}
        />
        <input 
          className="reply-comment-cancel"
          type="button"
          value="cancel"
          onClick={e=>{
            e.preventDefault();
            const newIsReplyArr = Array(this.props.commentInfo.length).fill(false);
            this.setState({ isReplyArr: newIsReplyArr });
          }}
        />
      </div>
    ) : (
      <span className="reply-btn" onClick={e=>{
        const userJSON = getSessionTokenJson();
        if (!userJSON) {
          alert('please login or sign up a new account');
          return 0;
        }
        const newIsReplyArr = Array(this.props.commentInfo.length).fill(false);
        newIsReplyArr[rootReplayIndex] = true
        this.setState({ isReplyArr: newIsReplyArr });
        }}>
        Reply
      </span>
    );

    const renderReplyList = this.state.isOpenReply ? commentData.map((comment, index)=>{
      const replayDate = formatDateTime(parseInt(comment.commentDate));
      if(index===0) {
        return (
          <span className="reply-arro" onClick={e=>{
            e.preventDefault();
            this.setState({ isOpenReply: false });
          }}>
            <GoChevronUp /> hide reply
          </span>
        );
      }
      const replyInnerInput = this.state.isReplyArr[index] ? (
        <div>
          <input
            className="reply-comment-input"
            id={comment.id}
            type="text"
            ref={`reply-${comment.commentId}`}
            placeholder="press enter to reply this comment"
          />
          <input 
            className="reply-comment-confirm"
            type="button"
            value="reply"
            onClick={e=>this.handleReplyClick(e, comment)}
          />
          <input 
          className="reply-comment-cancel"
          type="button"
          value="cancel"
          onClick={e=>{
            e.preventDefault();
            const newIsReplyArr = Array(this.props.commentInfo.length).fill(false);
            this.setState({ isReplyArr: newIsReplyArr });
          }}
        />
        </div>
      ) : (
        <span className="reply-btn" onClick={e=>{
          const userJSON = getSessionTokenJson();
          if (!userJSON) {
            alert('please login or sign up a new account');
            return 0;
          }
          const newIsReplyArr = Array(this.props.commentInfo.length).fill(false);
          newIsReplyArr[index] = true
        this.setState({ isReplyArr: newIsReplyArr });
          }}>
          Reply
        </span>
      ); 
      console.log(comment);
      return (
        <div key={index} className="comment-block-section reply">
          <div className="comment-user-avatar" onClick={e=>this.handleUserClick(e, comment.userId)}>
            <img 
                src={comment.userInfo.userIcon}
                height="100%"
                width="100%"
              />
          </div>
          <div className="comment-user-text" onClick={e=>this.handleUserClick(e, comment.userId)}>
            {comment.userInfo.userName}
          </div>
          <div className="comment-public-date">
              {replayDate}
          </div>
          <div className="comment-text reply">
            <p>replay to {rootComment.userInfo.userName}</p>
            {comment.commentContent}
          </div>
          <div className="reply-input-section">
            {replyInnerInput}
          </div>
        </div>
      );
    }) : (
      <span className="reply-arro" onClick={e=>{
        e.preventDefault();
        this.setState({ isOpenReply: true });
      }}>
        <GoChevronDown /> display reply
      </span>
    );

    return (
      <div className="comment-block-section">
        <div className="comment-user-avatar" onClick={e=>this.handleUserClick(e, rootComment.userId)}>
          <img 
            src={rootComment.userInfo.userIcon}
            height="100%"
            width="100%"
          />
        </div>
        <div className="comment-user-text" onClick={e=>this.handleUserClick(e, rootComment.userId)}>
          {rootComment.userInfo.userName}
        </div>
        <div className="comment-public-date">
          {uploadDate}
        </div>
        <div className="comment-text">
          {rootComment.commentContent}
        </div>
        <div className="reply-input-section">
          {replyInput}
        </div>
        <div className="comment-reply">
          {commentData.length === 1 ? null : renderReplyList}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (state);

export default connect(
  mapStateToProps, {
    getCommentListAction,
    completeGetComment
  }
)(CommentBlock);

