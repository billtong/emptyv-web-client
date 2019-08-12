import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import VideoTag from "./VideoTag";
import VideoDesc from "./VideoDesc";
import VideoButton from "./VideoButton";
import VideoTitleDisplay from "./VideoTitleDisplay";

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

class VideoPageInfo extends Component {
	render = () => {
		return (
			<Fragment>
				<Wrapper>
					<VideoTitleDisplay
						videoData={this.props.videoData}
					/>
					<VideoButton
						history={this.props.history}
						videoId={this.props.videoId}
					/>
				</Wrapper>
				<VideoDesc
					videoData={this.props.videoData}
				/>
				<VideoTag
					videoData={this.props.videoData}
				/>
			</Fragment>
		);
	}
}

export default VideoPageInfo;

VideoPageInfo.propTypes = {
	videoData: PropTypes.object,
	videoId: PropTypes.string,
	history: PropTypes.arrayOf(PropTypes.object),
};

VideoPageInfo.defaultProps = {
	videoData: {},
	videoId: null,
	history: [],
};
