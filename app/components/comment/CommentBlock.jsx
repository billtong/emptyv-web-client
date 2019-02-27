import React from 'react';
import {formatDateTime} from "../../utils/dateTools";


class CommentBlock extends React.Component {
    render() {
        const commentData = this.props.commentInfo;
        const upload_date = formatDateTime(parseInt(commentData.commentDate));

        return (
            <div className="comment-block-section">
                <div>
                    {commentData.userId}
                </div>
                <div>
                    {upload_date}
                </div>
                <div>
                    {commentData.commentContent}
                </div>
            </div>
        );
    }
}

module.exports = CommentBlock;
