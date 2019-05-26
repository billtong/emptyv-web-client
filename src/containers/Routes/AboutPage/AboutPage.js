import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Text from '../../../components/accessories/Text';

import "./AboutPage.css";
import XHelmet from "../../../components/accessories/XHelmet";
import {connect} from "react-redux";
import {Container} from "../../../components/accessories/entityDisplay/Container";
import {getCommentListAction} from "../../../store/actions/getCommentListAction";
import {postComment, postCommentA} from "../../../utils/api/comment";
import {getSessionTokenJson} from "../../../utils/api/apiHelper";

const aboutId = 0;

class AboutPage extends Component {
	state = {
		total: 1,           //total number of pages
		curr: 1,            //current page number
		cellNum: 7,         //max page display on pagination
		pageSize: 20,       //video entity numbers in one page
		commentList: this.props.commentList,
		commentSliceList: [],
		isBlur: true,
		isForcus: false
	};

	static defaultProps = {
		videoId: 0,  //comment id是0时指aboutpage的评论
	};

	componentWillMount() {
		document.addEventListener('keypress', this.handleEnterKey);
	}

	componentDidMount() {
		this.props.getCommentListAction({videoId: aboutId});
		document.removeEventListener('keypress', this.handleEenterKey);
		document.documentElement.scrollTop = 0;
	}

	//这个是comment的输入栏的提交法方法
	handleEnterKey=(e) => {
		if (e.keyCode === 13 && this.state.isForcus && !this.state.isBlur) {
			e.preventDefault();
			const comment = this.refs.comment.value;
			if (!comment || comment === null || comment === '' || (typeof comment === 'string' && comment.trim().length === 0)) {
				alert('fill with something please...');
				return;
			}
			this.refs.comment.value = '';
			if(this.isUserA) {
				postCommentA({
					commentContent: comment,
					commentParentId: 0
				}).then(()=> {
					this.props.getCommentListAction({videoId: this.props.videoId});
				}).catch((err)=>{
					alert(`failed post comment${err}`);
				});
			} else {
				postComment({
					commentContent: comment,
					videoId: this.props.videoId,
					userId: getSessionTokenJson().user.userId,
					commentParentId: 0
				}).then(() => {
					this.props.getCommentListAction({ videoId: this.props.videoId });
				}).catch((err) => {
					alert(`failed post comment${err}`);
				});
			}
		}
	};

	render = () => {
		const token = getSessionTokenJson();
		if(!token || token === null) {
			this.isUserA= true;
		} else {
			this.isUserA= false;
		}
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
			<div className="about-us-page">
				<XHelmet title={"About Us"}/>
				<div className="about-us-container">
					<h1 className="title-text">Empty Video</h1>
					<h4 className="title-text">1.2.0510</h4>
					<section>
						<h2><Text id="abs1"/></h2>
						<ul>
							<li><Text id="abl1_1"/></li>
							<li><Text id="abl1_2"/></li>
							<li><Text id="abl1_3"/></li>
							<li><Text id="abl1_4"/></li>
						</ul>
					</section>
					<section>
						<h2><Text id="abs2"/></h2>
						<ul>
							<li><Text id="abl2_1"/></li>
							<li><Text id="abl2_2"/></li>
							<li><Text id="abl2_3"/></li>
							<li><Text id="abl2_4"/></li>
						</ul>
					</section>
					<section>
            <span>
              <h2><Text id="abs3"/></h2>
              <li><Text id="abl3_1"/>Java, Golang, JavaScript, H5, CSS</li>
              <li><Text id="abl3_2"/>React, Spring Boot, Spring Cloud</li>
              <li><Text id="abl3_3"/>Docker, Jenkins</li>
              <li><Text id="abl3_4"/><p>emptyvideos@outlook.com</p></li>
              <li><Text id="abl3_5"/><p><a href="https://github.com/billtong">GitHub Account</a></p></li>
            </span>
					</section>
					<div className="foot-text">
						<div><Text id="abf"/></div>
						<div> — Empty Video Team</div>
					</div>
				</div>

				<div className="comment-container">
					<div className="comment-write-block-section">
						{commentUploadBox}
					</div>
					<Container
						list={this.props.commentList}
						isLoading={this.props.isLoading}
						totalLength={this.props.commentList ? this.props.commentList.length : 0}
						errMsg={this.props.error}
						layout={"verti-list"}
						entityType={"comment"}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ getCommentListReducer }) => {
	const {isLoading, commentList, error} = getCommentListReducer;
	return {isLoading, commentList, error};
};

export default withRouter(connect(
	mapStateToProps, {
		getCommentListAction
	}
)(AboutPage));
