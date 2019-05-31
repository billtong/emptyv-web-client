import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { MdAdd } from 'react-icons/md';
import {getSessionTokenJson} from "../../../utils/api/apiHelper";
import {patchTags} from "../../../utils/api/video";

const isUserA =  !getSessionTokenJson() || getSessionTokenJson() === null;
const user = getSessionTokenJson().user;

const Wrapper = styled.div`
  padding: 0.5rem 1rem;
	border-top: 1px solid #313131;
`;

const TagWrapper = styled.div`
	display: inline-block;
	padding-right: .5rem;
	border: 0.15rem solid #d9d9d9;
	border-radius: 1rem;
	padding: 0 1rem;
	margin: 0 10px 8px 0;
	font-weight: 500;
`;

class VideoTag extends Component{
	state = {
		tagList: [],  //用于记录改变的tagList
		isTagAdd: false,              //用于记录btn和input的状态改变
		isTagBlur: true,              //blur和focus是防止被其他input的enter提交给影响
		isTagForcus: false            //blur和focus是防止被其他input的enter提交给影响
	};

	componentWillMount=() => {
		document.addEventListener('keypress', this.handleEnterKey);
	};

	componentDidMount=() => {
		document.removeEventListener('keypress', this.handleEenterKey);
	};

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if(prevProps.videoData !== this.props.videoData) {
			this.setState({
				tagList: this.props.videoData.videoTag
			});
		}
	};

	//点击Enter键提交这个tag
	handleEnterKey=(e) => {
		if (e.keyCode === 13 && this.state.isTagForcus && !this.state.isTagBlur) {
			e.preventDefault();
			const content = this.refs.addTag.value;
			if (!content || content === null || content === '' || (typeof content === 'string' && content.trim().length === 0)) {
				alert('fill with something please...');
				return;
			}
			const { tagList } = this.state;
			const tag = this.refs.addTag.value;
			this.refs.addTag.value = '';
			const newTagList = (!tagList || typeof tagList !== 'string' || tagList.constructor !== String) ? [] : tagList.split(',');
			newTagList.push(tag);
			patchTags({
				videoId: this.props.videoData.videoId,
				tagJsonString: newTagList.join(',')
			});
			this.setState({
				isTagAdd: false,
				isTagForcus: false,
				isTagBlur: true,
				tagList: newTagList.join(',')
			});
		}
	};

	//click the add button to open input board
	handleClick=(e) => {
		e.preventDefault();
		const userJSON = getSessionTokenJson();
		if (!isUserA && user.userId === this.props.videoData.userId) {
			this.setState({
				isTagAdd: true,
				isTagForcus: true,
				isTagBlur: false
			});
		} else {
			alert("only uploader can add tags >_<# !");
		}
	};

	//监听tag输入筐的focus状态
	ifTagForcus=() => {
		this.setState({
			isTagForcus: true,
			isTagBlur: false
		});
	};

	//监听tag输入框的blur状态
	ifTagBlur=() => {
		this.setState({
			isTagForcus: false,
			isTagBlur: true,
			isTagAdd: false
		});
	};

	render = () => {
		const { tagList } = this.state;
		const solvedTageList = (!tagList || typeof tagList !== 'string' || tagList.constructor !== String) ? [] : tagList.split(',');
		const tagListSec = (!solvedTageList || solvedTageList.length === 0 ) ? (
			<span key={-1}>no tags yet</span>
		) : (
			solvedTageList.map((value, index) => {
				return (
					<TagWrapper key={index}>
						{value}
					</TagWrapper>
				);
			})
		);
		const addTag = (this.state.isTagAdd) ? (
			<div>
				<input
					className="add-input"
					id="add-tag-input"
					autoFocus="true"
					placeholder="Press <Enter> to Add"
					onKeyPress={e => this.handleEnterKey(e)}
					onFocus={this.ifTagForcus}
					onBlur={this.ifTagBlur}
					type="text"
					ref="addTag"
				/>
			</div>
		) : (
			<div>
				<div className="add-btn" onClick={e => this.handleClick(e)}>
					<MdAdd className="add-icon" />
				</div>
				Add New Tags
			</div>
		);
		return (
			<Fragment>
				<Wrapper>
					{tagListSec}
					{addTag}
				</Wrapper>
			</Fragment>
		);
	}
}

export default VideoTag;

VideoTag.propTypes = {
	videoData: PropTypes.object,
};

VideoTag.defaultProps = {
	videoData: {},
};
