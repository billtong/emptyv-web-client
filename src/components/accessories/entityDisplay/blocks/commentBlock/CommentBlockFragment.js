import React from 'react';
import {connect} from 'react-redux';
import {MdMoreVert} from 'react-icons/md';

import {formatDateTime} from '../../../../../utils/dateTools';
import {getSessionTokenJson} from '../../../../../utils/api/apiHelper';
import {getCommentListAction} from '../../../../../store/actions/getCommentListAction';
import {deleteComment, postComment} from '../../../../../utils/api/comment';
import UserAvatar from '../../../UserAvatar';
import Text from '../../../Text';

class CommentBlockFrag extends React.Component {
	state = {
		isReply: false
	};

	//这个是comment的输入栏的提交法方法
	handleReplySubmit = (e, reComment) => {
		const comment = this.refs[`reply-${reComment.commentId}`].value;
		if (!comment || comment === null || comment === '' || (typeof comment === 'string' && comment.trim().length === 0)) {
			alert('fill with something please...');
			return;
		}
		this.refs[`reply-${reComment.commentId}`].value = '';
		const inputJson = {
			commentContent: comment,
			videoId: reComment.videoId,
			userId: getSessionTokenJson().user.userId,
			commentParentId: reComment.commentId
		};
		e.preventDefault();
		postComment(inputJson)
		.then(() => {
			this.setState({isReply: false});
			this.props.getCommentListAction({videoId: reComment.videoId});
		})
		.catch((err) => {
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
		return getSessionTokenJson() !== null && this.props.comment.userId === getSessionTokenJson().user.userId;
	};

	handleDelete = (e) => {
		e.preventDefault();
		deleteComment({commentId: this.props.comment.commentId}).then(() => {
			this.props.getCommentListAction({videoId: this.props.comment.videoId});
		}).catch((err) => {
			alert(err);
		});
	};

	render() {
		const uploadDate = formatDateTime(parseInt(this.props.comment.commentDate));
		const replyTag = !this.props.rootComment ? null : (
			<div className="comment-text reply">
				<p>@{this.props.rootComment.userInfo.userName}</p>
			</div>
		);
		const replyInput = this.state.isReply ? (
			<div className="reply-comment">
				<input
					className="reply-comment-input"
					type="text"
					ref={`reply-${this.props.comment.commentId}`}
					autoComplete="off"
				/>
				<Text id="c_send" children={text=><input
					className="reply-comment-confirm"
					type="button"
					value={text}
					onClick={e => this.handleReplySubmit(e, this.props.comment)}
				/>}/>

				<Text id="c_cancel" children={text=><input
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
				<UserAvatar userInfo={this.props.comment.userInfo}/>
				<div className="comment-public-date">
					#{this.props.floor} {uploadDate}
				</div>
				<a className="comment-menu-btn">
					<MdMoreVert/>
					<ul className="comment-menu">
						{deleteBtn}
						<li><Text id="c_report"/></li>
					</ul>
				</a>
				{replyTag}
				<div className="comment-text">
					{this.props.comment.commentContent}
				</div>
				<div className="reply-input-section">
					{replyInput}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => (state);

export default connect(
	mapStateToProps, {
		getCommentListAction
	}
)(CommentBlockFrag);
