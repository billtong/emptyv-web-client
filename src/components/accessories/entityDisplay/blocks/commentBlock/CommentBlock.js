import React from 'react';
import {GoChevronDown, GoChevronUp} from 'react-icons/go';
import CommentBlockFrag from './CommentBlockFragment';
import Text from '../../../Text';
import './CommentBlock.css';

class CommentBlock extends React.Component {
	state = {
		isOpenReply: false,
		isReplyArr: Array(this.props.commentInfo.length).fill(false)
	};

	reverseRepliesComment = (list) => (
		list.map((item, index) => {
			if (index === 0) {
				return item;
			} else {
				return list[list.length - index];
			}
		})
	);

	render() {
		const rootComment = this.props.commentInfo[0];
		const clist = this.reverseRepliesComment(this.props.commentInfo);
		const renderReplyList = this.state.isOpenReply ? clist.map((comment, index) => {
			if (index === 0) {
				return (
					<span key={index} className="reply-arro" onClick={e => {
						e.preventDefault();
						this.setState({isOpenReply: false});
					}}>
						<GoChevronUp/> <Text id="c_hide"/>
					</span>
				);
			}
			let rc = null;
			clist.forEach(element => {
				if (element.commentId === comment.commentParentId) {
					rc = element;
				}
			});
			return (
				<div key={index} className="comment-block-section">
					<CommentBlockFrag
						floor={clist.length - index}
						comment={comment}
						rootComment={rc}
					/>
				</div>
			);
		}) : (
			<span className="reply-arro" onClick={e => {
				e.preventDefault();
				this.setState({isOpenReply: true});
			}}>
        <GoChevronDown/> <Text id="c_display"/>
      </span>
		);
		return (
			<div className="comment-block-section">
				<CommentBlockFrag
					floor={this.props.floor}
					comment={rootComment}
				/>
				<div className="comment-reply">
					{clist.length === 1 ? null : renderReplyList}
				</div>
			</div>
		);
	}
}

export default CommentBlock;
