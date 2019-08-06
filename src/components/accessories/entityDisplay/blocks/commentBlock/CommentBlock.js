import React, {Fragment} from 'react';
import {GoChevronDown, GoChevronUp} from 'react-icons/go';
import CommentBlockFrag from './CommentBlockFragment';
import Text from '../../../Text';
import './CommentBlock.css';
import PropTypes from "prop-types";

class CommentBlock extends React.Component {
	state = {
		isOpenReply: false,
		isReplyArr: this.props.commentInfo.replies ? Array(this.props.commentInfo.replies.length).fill(false) : []
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

	/*
	<Fragment>
						<span key={index} className="reply-arro" onClick={e => {
								e.preventDefault();
								this.setState({isOpenReply: false});
							}}>
							<GoChevronUp/> <Text id="c_hide"/>
						</span>
					</Fragment>
	 */

	render() {
		const {commentInfo} = this.props;
		const clist = commentInfo.replies ? commentInfo.replies : [];
		const renderReplyList = this.state.isOpenReply ?
			(
				<Fragment>
						<span key={commentInfo.id} className="reply-arro" onClick={e => {
							e.preventDefault();
							this.setState({isOpenReply: false});
						}}>
							<GoChevronUp/> <Text id="c_hide"/>
						</span>
					{
						clist.map((comment, index) => {
							return (
								<div key={index} className="comment-block-section">
									<CommentBlockFrag
										floor={clist.length - index}
										comment={comment}
										rootComment={commentInfo}
									/>
								</div>
							);
						})
					}
				</Fragment>
			) : (
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
					comment={commentInfo}
				/>
				<div className="comment-reply">
					{clist.length === 0 ? null : renderReplyList}
				</div>
			</div>
		);
	}
}

CommentBlock.propTypes = {
	commentInfo: PropTypes.object,
};

CommentBlock.defaultProps = {
	commentInfo: {
		at: "",
		created: new Date(),
		deleted: false,
		id: "",
		likeNum: 0,
		parentId: "",
		replyNum: 0,
		text: "",
		userId: "",
		videoId: "",
		replies: []
	}
};

export default CommentBlock;
