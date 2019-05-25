import React from 'react';
import { connect } from 'react-redux';
import { MdMoreVert } from 'react-icons/md';

import { formatDateTime } from '../../../../../utils/dateTools';
import { getSessionTokenJson } from '../../../../../utils/api/apiHelper';
import { getCommentListAction, completeGetComment } from '../../../../../store/actions/getCommentListAction';
import { postComment, deleteComment } from '../../../../../utils/api/comment';
import UserAvatar from '../../../UserAvatar';

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
			this.props.getCommentListAction({ videoId: reComment.videoId });
		})
		.catch((err) => {
			alert(`failed post comment${err}`);
		});
	};

	handleReplyClick = (e, flag) => {
		if(flag) {
			const userJSON = getSessionTokenJson();
			if (!userJSON) {
				alert('please login or sign up a new account');
				return 0;
			}
		}
		this.setState({ isReply: flag });
	};

	checkDeletePerm = () => {
		return getSessionTokenJson() !== null && this.props.comment.userId === getSessionTokenJson().user.userId;
	};

	handleDelete = (e) => {
		e.preventDefault();
		deleteComment({ commentId: this.props.comment.commentId }).then(()=>{
			this.props.getCommentListAction({ videoId: this.props.comment.videoId });
		}).catch((err)=>{
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
					placeholder="press enter to reply this comment"
				/>
				<input
					className="reply-comment-confirm"
					type="button"
					value="reply"
					onClick={e=>this.handleReplySubmit(e, this.props.comment)}
				/>
				<input
					className="reply-comment-cancel"
					type="button"
					value="cancel"
					onClick={e => this.handleReplyClick(e, false)}
				/></div>
		) : (
			<span className="reply-btn" onClick={e => this.handleReplyClick(e, true)}>Reply</span>
		);
		const deleteBtn = this.checkDeletePerm() ? (
			<li onClick={e => this.handleDelete(e)}>delete</li>
		) : null;
		return (
			<React.Fragment>
				<UserAvatar userInfo={this.props.comment.userInfo}/>
				<div className="comment-public-date">
					#{this.props.floor} {uploadDate}
				</div>
				<a className="comment-menu-btn">
					<MdMoreVert />
					<ul className="comment-menu">
						{deleteBtn}
						<li >report</li>
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
		getCommentListAction,
		completeGetComment
	}
)(CommentBlockFrag);
