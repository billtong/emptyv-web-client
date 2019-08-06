import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {getFavList} from "../../../utils/api/fav";
import {TitleText, VideoWrapper} from "./UserUploadVideo";
import Video from "../../../components/accessories/video";
import {formatDateTime} from "../../../utils/dateTools";

const FavFlexWrapper = styled.div`
	display: flex;
	justify-content: start;
`;

const FavDetailsWrapper = styled.div`
	margin: 1.5rem 2rem;
`;

const FavListDetails = styled.div`
	display: inline;
	margin-right: 1rem;
`;

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

class UserFavVideo extends Component {
	state = {
		favListSelectedId: 0,
		favListSelected: {},
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
			if (this.state.favListSelectedId === value.favId) {
				return (
					<LittleTitleSelected>{value.favName}</LittleTitleSelected>
				);
			}
			const handleFavMenuClick = (e, favId) => {
				e.preventDefault();
				this.setState({
					favListSelectedId: value.favId,
					favListSelected: value,
					videoList: value.videoList,
				});
			};
			return (
				<LittleTitle key={index} ref={index} onClick={(e) => handleFavMenuClick(e, value.favId)}>
					{value.favName}
				</LittleTitle>
			);
		});

		const favListInfo = (this.state.favListSelected && this.state.favListSelected.videoList) && (
			<FavDetailsWrapper>
				<FavListDetails>
					{this.state.favListSelected.videoList.length} videos
				</FavListDetails>
				<FavListDetails>
					Published on {formatDateTime(parseInt(this.state.favListSelected.favDate, 0))}
				</FavListDetails>
			</FavDetailsWrapper>
		);

		return (
			<Fragment>
				<VideoWrapper>
					<FavFlexWrapper>
						<div>
							<TitleText>Favourite List</TitleText>
							{favMenuList}
						</div>
						{favListInfo}
					</FavFlexWrapper>
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
