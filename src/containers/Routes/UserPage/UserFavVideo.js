import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {getFavList} from "../../../utils/api/fav";
import {TitleText, VideoWrapper} from "./UserUploadVideo";
import Video from "../../../components/accessories/video";

export const EmptyTitle = styled.div`
	font-size: 1rem;
	font-style: italic;
	display: inline;
	margin-left: 1rem;
`;

export const LittleTitleSelected = styled.div`
	font-size: 1rem;
	color: orange;
	display: inline;
	margin-left: 1rem;
	cursor: pointer;
`;

export const LittleTitle = styled.div`
	font-size: 1rem;
	display: inline;
	margin-left: 1rem;
	cursor: pointer;
`;

class UserFavVideo extends Component{
	state = {
		favListSelected: 0,
		favList: [],
		videoList: [],
		isLoading: false,
		errMsg: null,
	};
	componentDidMount = () => {
		this.setState({
			isLoading: true,
		});
		getFavList({
			userId: this.props.userId
		}).then(res => {
			this.setState({
				favList: res.data,
				isLoading: false,
			});
		}).catch((err) => {
			this.setState({
				isLoading: false,
				errMsg: err.message,
			});
		});
	};

	render = () => {
		const favMenuList = (!this.state.favList || this.state.favList.length === 0) ? (
			<EmptyTitle>empty</EmptyTitle>
		) : this.state.favList.map((value, index) => {
			if (this.state.favListSelected === value.favId) {
				return (
					<LittleTitleSelected>{value.favName}</LittleTitleSelected>
				);
			}
			const handleFavMenuClick = (e, favId) => {
				e.preventDefault();
				this.setState({
					favListSelected: value.favId,
					videoList: value.videoList,
				});
			};
			return (
				<LittleTitle key={index}  ref={index} onClick={(e) => handleFavMenuClick(e, value.favId)}>
					{value.favName}
				</LittleTitle>
			);
		});

		return (
			<Fragment>
				<VideoWrapper>
					<TitleText>Favourite List</TitleText>
					{favMenuList}
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

export default UserFavVideo;

UserFavVideo.propsTypes = {
	userId: PropTypes.number,
};

UserFavVideo.defaultProps = {
	userId: null,
};
