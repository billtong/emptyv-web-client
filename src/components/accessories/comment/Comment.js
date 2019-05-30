import React, {Component, Fragment} from 'react';
import connect from "react-redux/es/connect/connect";
import {getCommentListAction} from "../../../store/actions/getCommentListAction";
import {Container} from "../entityDisplay/Container";
import Pagination from "../entityDisplay/Pagination";
import {getSessionTokenJson} from "../../../utils/api/apiHelper";
import {postComment, postCommentA} from "../../../utils/api/comment";
import PropTypes from "prop-types";
import "./Comment.css";
import history from "../../../utils/history";

const cellNum = 7; //max cells display on pagination
const pageSize = 8; //comment entity numbers in one page

class Comment extends Component {

	state = {
		total: 1,           //total number of pages
		curr: 1,            //current page number
		commentList: this.props.commentList,
		commentSliceList: [],
		isBlur: true,
		isForcus: false
	};
	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (prevProps.commentList !== this.props.commentList) {
			const currPage = prevState.curr;
			this.setState({
				total: Math.ceil(this.props.commentList.length / pageSize),
				curr: currPage,
				commentList: this.props.commentList,
				commentSliceList: this.props.commentList.slice((currPage - 1) * pageSize, ((currPage - 1) * pageSize) + pageSize),
			});
		}
		console.log("did update", this.state);
	}
	handleEnterKey = (e) => {
		if (e.keyCode === 13 && this.state.isForcus && !this.state.isBlur) {
			e.preventDefault();
			const comment = this.refs.comment.value;
			if (!comment || comment === null || comment === '' || (typeof comment === 'string' && comment.trim().length === 0)) {
				alert('fill with something please...');
				return;
			}
			this.refs.comment.value = '';
			if (this.isUserA) {
				if(this.props.videoId === 0) {
					postCommentA({
						commentContent: comment,
						commentParentId: 0
					}).then(() => {
						this.props.getCommentListAction({videoId: this.props.videoId});
					}).catch((err) => {
						alert(`failed post comment${err}`);
					});
				} else {
					history.push("/login");
				}
			} else {
				postComment({
					commentContent: comment,
					videoId: this.props.videoId,
					userId: getSessionTokenJson().user.userId,
					commentParentId: 0
				}).then(() => {
					this.props.getCommentListAction({videoId: this.props.videoId});
				}).catch((err) => {
					alert(`failed post comment${err}`);
				});
			}
		}
	};
	handlePaginationClick = (currPage) => {
		const {commentList} = this.state;
		const newCommentList = commentList.slice((currPage - 1) * pageSize, ((currPage - 1) * pageSize) + pageSize);
		this.setState({
			curr: currPage,
			commentSliceList: newCommentList,
		});
	};
	render = () => {
		const token = getSessionTokenJson();
		this.isUserA = !token || token === null;
		const commentUploadBox = (
			<div className="comment-box">
				<input
					className="form-control comment-content"
					id="comment-box"
					placeholder="Press <Enter> to leave a suggestion"
					autoComplete="off"
					onKeyPress={e => this.handleEnterKey(e)}
					onFocus={() => {
						this.setState(prevState => ({
							...prevState,
							isForcus: true,
							isBlur: false
						}));
					}}
					onBlur={() => {
						this.setState(prevState => ({
							...prevState,
							isForcus: false,
							isBlur: true
						}));
					}}
					ref="comment"
				/>
			</div>
		);
		return (
			<Fragment>
				<div className="comment-container">
					<div className="comment-write-block-section">
						{commentUploadBox}
					</div>
					<Container
						list={this.state.commentSliceList}
						isLoading={this.props.isLoading}
						totalLength={this.props.commentList ? this.props.commentList.length : 0}
						errMsg={this.props.error}
						layout={"verti-list"}
						entityType={"comment"}
					/>
					<div>
						<Pagination
							total={this.state.total}
							curr={this.state.curr}
							cellNum={cellNum}
							passFatherState={this.handlePaginationClick}
						/>
					</div>
				</div>
			</Fragment>
		);
	}

	componentWillMount() {
		document.addEventListener('keypress', this.handleEnterKey);
	}

	componentDidMount() {
		this.props.getCommentListAction({videoId: this.props.videoId});
		document.removeEventListener('keypress', this.handleEenterKey);
		document.documentElement.scrollTop = 0;
		console.log("did mount");
	}
}


Pagination.propTypes = {
	videoId: PropTypes.number,
};

Pagination.defaultProps = {
	videoId: null,
};


const mapStateToProps = ({getCommentListReducer}) => {
	const {isLoading, commentList, error} = getCommentListReducer;
	return {isLoading, commentList, error};
};

export default connect(
	mapStateToProps, {
		getCommentListAction
	}
)(Comment);
