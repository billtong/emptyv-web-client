import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import UserAvatar from "../../../components/accessories/UserAvatar";
import {formatDateTime} from "../../../utils/dateTools";
import Text from '../../../components/accessories/Text';

const AvaterWrapper = styled.div`
	margin-inline-start: 1rem;
	margin-block-start: 0.5rem;
	margin-block-end: 0.5rem;
`;

const TimeWrapper = styled.div`
		font-weight: 100;
		margin-inline-start: 1rem;
		display: inline-block;
`;

const DescAllWrapper = styled.div`
	margin-inline-start: 5rem;
`;

const DescHideWrapper = styled.div`
	margin-inline-start: 5rem;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`;

const EmptyWrapper = styled.div`
	font-style:italic
	margin-inline-start: 5rem;
`;

const ShowButton = styled.div`
	margin-inline-start: 5rem;
	margin-block-start: 0.5rem;
	margin-block-end: 1rem;
	cursor: pointer;
	color: grey;
`;


class VideoDesc extends Component {
	state = {
		showCompelete: false,
	};

	render = () => {

		let videoDesc = null;
		if (this.props.videoData.description) {
			videoDesc = this.state.showCompelete ? (
				<DescAllWrapper>{this.props.videoData.description}</DescAllWrapper>
			) : (
				<DescHideWrapper>{this.props.videoData.description}</DescHideWrapper>
			);
		} else {
			videoDesc = <EmptyWrapper>It is empty here</EmptyWrapper>;
		}

		return (
			<Fragment>
				<AvaterWrapper>
					<UserAvatar userInfo={this.props.videoData.userInfo}/>
					<TimeWrapper><Text id="v_publish"/> {this.props.videoData.create}</TimeWrapper>
				</AvaterWrapper>

				{videoDesc}
				{!this.state.showCompelete ? (
					<ShowButton onClick={e => {
						this.setState({showCompelete: true});
					}}><Text id="v_show"/></ShowButton>
				) : (
					<ShowButton onClick={e => {
						this.setState({showCompelete: false});
					}}><Text id="v_hide"/></ShowButton>
				)}
			</Fragment>
		);
	}
}

export default VideoDesc;

VideoDesc.propTypes = {
	videoData: PropTypes.object,
};

VideoDesc.defaultProps = {
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
