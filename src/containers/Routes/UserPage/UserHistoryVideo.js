import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {TitleText, VideoWrapper} from "./UserUploadVideo";
import {EmptyTitle, LittleTitle, LittleTitleSelected} from "./UserFavVideo";
import {getUserHistory} from "../../../utils/api/user";
import Video from "../../../components/accessories/video";

class UserHistoryVideo extends Component{
	state = {
		history: [],
		action: -1,
		videoList: [],
		isLoading: false,
		errMsg: null,
	};

	componentDidMount = () => {
		this.setState({
			isLoading: true,
		});
		getUserHistory().then(res => {
			this.setState({
				history: res.data,
				isLoading: false,
			});
		}).catch((err) => {
			this.setState({
				isLoading: false,
				errMsg: err.message,
			});
		});
	};

	generateHistoryVideoList=(rawVideoList, action) => {
		let list = rawVideoList.map((value) => {
			if (value.action === action) {
				return value.video;
			}
		});
		list = list.filter(video => video != null);
		for(let index = list.length-1; index >= 0; index--) {
			if (index >= 1 && list[index-1].videoId === list[index].videoId) {
				list.splice(index, 1);
			}
		}
		this.setState({videoList: list});
	};

	render = () => {
		const HistMenuArr = ['view', 'like', 'unlike'];
		const historyMenuList = this.state.history && this.state.history.length > 0 ? HistMenuArr.map((value, index) => {
			if (this.state.action === index + 1) {
				return (
					<LittleTitleSelected key={index}>{value}</LittleTitleSelected>
				);
			}
			const handleHistoryMenuClick = (e, newAction) => {
				e.preventDefault();
				this.setState({
					action: newAction,
				});
				this.generateHistoryVideoList(this.state.history, newAction);
			};
			return (
				<LittleTitle key={index} onClick={e => handleHistoryMenuClick(e, index + 1)}>{value}</LittleTitle>
			);
		}) : (<EmptyTitle>It is empty here</EmptyTitle>);
		return (
			<Fragment>
				<VideoWrapper>
					<TitleText>History</TitleText>
					{historyMenuList}
					<Video
						videoList={this.state.videoList}
						isLoading={this.state.isLoading}
						errMsg={this.state.errMsg}
						pageSize={3}
					/>
				</VideoWrapper>
			</Fragment>
		);
	}
}

export default UserHistoryVideo;

UserHistoryVideo.propsTypes = {
	userId: PropTypes.number,
};

UserHistoryVideo.defaultProps = {
	userId: null,
};
