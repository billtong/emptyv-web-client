import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { IoIosHeart } from 'react-icons/io';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import {formatDateTime} from "../../../utils/dateTools";
import UserAvatar from "../../../components/accessories/UserAvatar";

const TitleWrapper = styled.h3`
	font-size: 1.5rem;
	margin-block-start: 0;
	margin-block-end: 0;
	margin-inline-start: 1rem;
`;

const NumWrapper = styled.div`
	display: flex
`;

const Num = styled.div`
	font-weight: 100;
	margin-inline-start: 1rem;
`;

class VideoTitleDisplay extends Component{

	likeRateIcon = () => {
		let likeRate = 100;
		const videoLikeNum = parseInt(this.props.videoData.videoLikeNum, 10);
		const videoUnlikeNum = parseInt(this.props.videoData.videoUnlikeNum, 10);
		if(videoLikeNum === videoLikeNum + videoUnlikeNum) {
			likeRate = 100;
		} else if(videoUnlikeNum === videoLikeNum+videoUnlikeNum) {
			likeRate = 0;
		} else {
			likeRate = (videoLikeNum / (videoLikeNum+videoUnlikeNum)).toFixed(2).slice(-2);
		}
		return likeRate >= 50 ? (
			<Num>{likeRate}% <MdThumbUp color="#5faa01" /></Num>
		) : (
			<Num>{likeRate}% <MdThumbDown color="#c71d1d" /></Num>
		)
	};

	render = () => {
		return (
			<Fragment>
				<div>
					<TitleWrapper>{this.props.videoData.videoName}</TitleWrapper>
					<NumWrapper>
						<Num>{this.props.videoData.videoViewNum} views</Num>
						{this.likeRateIcon()}
						<Num> {this.props.videoData.videoFavouriteNum}<IoIosHeart color={"orange"} /></Num>
					</NumWrapper>
				</div>
			</Fragment>
		);
	}
}

export default VideoTitleDisplay;

VideoTitleDisplay.propTypes = {
	videoData: PropTypes.object,
};

VideoTitleDisplay.defaultProps = {
	videoData: {
		videoName: null,
		videoDate: null,
		videoViewNum: 0,
		videoLikeNum: 0,
		videoUnlikeNum: 0,
		videoFavouriteNum: 0
	},
};
