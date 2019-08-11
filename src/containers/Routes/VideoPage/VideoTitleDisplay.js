import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {IoIosHeart} from 'react-icons/io';
import {MdThumbDown, MdThumbUp} from 'react-icons/md';
import Text from '../../../components/accessories/Text';

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

class VideoTitleDisplay extends Component {
	likeRateIcon = () => {
		let likeRate = 100;
		const videoLikeNum = parseInt(this.props.videoData.likeCount, 10);
		const videoUnlikeNum = parseInt(this.props.videoData.unlikeCount, 10);
		if (videoLikeNum === videoLikeNum + videoUnlikeNum) {
			likeRate = 100;
		} else if (videoUnlikeNum === videoLikeNum + videoUnlikeNum) {
			likeRate = 0;
		} else {
			likeRate = (videoLikeNum / (videoLikeNum + videoUnlikeNum)).toFixed(2).slice(-2);
		}
		return likeRate >= 50 ? (
			<Num>{likeRate}% <MdThumbUp color="#5faa01"/></Num>
		) : (
			<Num>{likeRate}% <MdThumbDown color="#c71d1d"/></Num>
		)
	};

	render = () => {
		return (
			<Fragment>
				<div>
					<TitleWrapper>{this.props.videoData.name}</TitleWrapper>
					<NumWrapper>
						<Num>{this.props.videoData.viewCount} <Text id={"vb_views"}/></Num>
						{this.likeRateIcon()}
						<Num> {this.props.videoData.favCount}<IoIosHeart color={"orange"}/></Num>
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
		commentCount: 0,
		create: "",
		danCount: 0,
		description: "",
		favCount: 0,
		id: "",
		likeCount: 0,
		name: "",
		tags: [],
		thumbnailSrc: "",
		unlikeCount: 0,
		userId: "",
		videoSrc: "",
		viewCount: 0
	},
};
