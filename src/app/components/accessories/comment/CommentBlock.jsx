import React from 'react';
import { formatDateTime } from '../../../utils/dateTools';

class CommentBlock extends React.Component {
  render() {
    const commentData = this.props.commentInfo;
    const rootComment = commentData[0];
    const uploadDate = formatDateTime(parseInt(rootComment.commentDate));

    const replyComments = commentData;
    replyComments.splice(0, 1);
    const commentReply = replyComments.length > 0 ? replyComments.map((comment, index)=>{
      const replayDate = formatDateTime(parseInt(comment.commentDate));
      return (
        <div key={index} className="comment-block-section">
          <div className="comment-user-avatar">
            <img 
                src={comment.userInfo.userIcon}
                height="100%"
                width="100%"
              />
          </div>
          <div className="comment-user-text">
            {comment.userInfo.userName}
          </div>
          <div className="comment-public-date">
              {replayDate}
          </div>
          <div className="comment-text reply">
            <p>replay to {rootComment.userInfo.userName}</p>
            {comment.commentContent}
          </div>
        </div>
      );
    }) : null;

    return (
      <div className="comment-block-section">
        <div className="comment-user-avatar">
          <img 
            src={rootComment.userInfo.userIcon}
            height="100%"
            width="100%"
          />
        </div>
        <div className="comment-user-text">
          {rootComment.userInfo.userName}
        </div>
        <div className="comment-public-date">
          {uploadDate}
        </div>
        <div className="comment-text">
          {rootComment.commentContent}
        </div>
        <div className="comment-reply">
        {commentReply}
        </div>
      </div>
    );
  }
}

export default  CommentBlock;
