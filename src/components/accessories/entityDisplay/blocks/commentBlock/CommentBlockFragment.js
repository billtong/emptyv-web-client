import React from 'react';
import {connect} from 'react-redux';
import {MdMoreVert} from 'react-icons/md';

import {getSessionTokenJson} from '../../../../../utils/api/apiHelper';
import {getCommentListAction} from '../../../../../store/actions/getCommentListAction';
import {deleteComment, postComment} from '../../../../../utils/api/comment';
import UserAvatar from '../../../UserAvatar';
import Text from '../../../Text';
import PropTypes from "prop-types";

class CommentBlockFrag extends React.Component {
    state = {
        isReply: false,
        isLoading: false,
        userInfo: null
    };

    //这个是comment的输入栏的提交法方法
    handleReplySubmit = (e) => {
        const reComment = this.props.comment;
        const comment = this.refs[`reply-${reComment.id}`].value;
        if (!comment || comment === null || comment === '' || (typeof comment === 'string' && comment.trim().length === 0)) {
            alert('fill with something please...');
            return;
        }
        this.refs[`reply-${reComment.id}`].value = '';
        e.preventDefault();
        const parentId = this.props.rootComment ? this.props.rootComment.id : reComment.id;
        postComment({
            text: comment,
            videoId: reComment.videoId,
            parentId: parentId
        }).then(() => {
            this.setState({isReply: false});
            this.props.getCommentListAction({videoId: reComment.videoId});
        }).catch((err) => {
            alert(`failed post comment${err}`);
        });
    };

    handleReplyClick = (e, flag) => {
        if (flag) {
            const userJSON = getSessionTokenJson();
            if (!userJSON) {
                alert('please login or sign up a new account');
                return 0;
            }
        }
        this.setState({isReply: flag});
    };

    checkDeletePerm = () => {
        return !this.props.comment.deleted && getSessionTokenJson() !== null && this.props.comment.userId === getSessionTokenJson().user.id;
    };

    handleDelete = (e) => {
        e.preventDefault();
        deleteComment({commentId: this.props.comment.id}).then(() => {
            this.props.getCommentListAction({videoId: this.props.comment.videoId});
        }).catch((err) => {
            alert(err);
        });
    };

    render() {
        const uploadDate = this.props.comment.created;
        const replyTag = !this.props.comment.at ? null : (
            <div className="comment-text reply">
                <p>@{this.props.rootComment.id}</p>
            </div>
        );
        const replyInput = this.state.isReply ? (
            <div className="reply-comment">
                <input
                    className="reply-comment-input"
                    type="text"
                    ref={`reply-${this.props.comment.id}`}
                    autoComplete="off"
                />
                <Text id="c_send" children={text => (<input
                    className="reply-comment-confirm"
                    type="button"
                    value={text}
                    onClick={e => this.handleReplySubmit(e)}
                />)
                }
                />
                <Text id="c_cancel" children={text => <input
                    className="reply-comment-cancel"
                    type="button"
                    value={text}
                    onClick={e => this.handleReplyClick(e, false)}
                />}/>
            </div>
        ) : (
            <span className="reply-btn" onClick={e => this.handleReplyClick(e, true)}><Text id="c_reply"/></span>
        );
        const deleteBtn = this.checkDeletePerm() ? (
            <li onClick={e => this.handleDelete(e)}><Text id="c_delete"/></li>
        ) : null;
        return (
            <React.Fragment>
                {this.props.comment.userInfo && <UserAvatar userInfo={this.props.comment.userInfo}/>}
                <div className="comment-public-date">
                    #{this.props.floor} {uploadDate}
                </div>
                <div className="comment-menu-btn">
                    <MdMoreVert/>
                    <ul className="comment-menu">
                        {deleteBtn}
                        <li><Text id="c_report"/></li>
                    </ul>
                </div>
                {replyTag}
                <div>
                    <Text id={"c_hover_delete_tip"}>
                        {text => (
                            <span className={this.props.comment.deleted ? "deleted-comment-text" : "comment-text"}
                                  tip={text}>
								{this.props.comment.text}
							</span>
                        )}
                    </Text>
                </div>
                <div className="reply-input-section">
                    {replyInput}
                </div>
            </React.Fragment>
        );
    }
}

CommentBlockFrag.propTypes = {
    rootComment: PropTypes.object,
    comment: PropTypes.object,
};


const mapStateToProps = (state) => (state);

export default connect(
    mapStateToProps, {
        getCommentListAction
    }
)(CommentBlockFrag);
