import React from 'react';
import { formatDateTime } from '../../../utils/dateTools';


class CommentBlock extends React.Component {
    render() {
        const commentData = this.props.commentInfo;
        const uploadDate = formatDateTime(parseInt(commentData.commentDate));
        return (
            <div className="comment-block-section">
                <div className="comment-user-text">
                    {commentData.userId}
                </div>
                <div className="comment-public-date">
                    {uploadDate}
                </div>
                <div className="comment-text">
                    {commentData.commentContent}
                </div>
            </div>
        );
    }
}

module.exports = CommentBlock;
