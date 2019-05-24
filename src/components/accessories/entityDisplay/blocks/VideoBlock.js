import React, {Fragment, Component} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";



const handleVideoBlockClick = (e, videoId) => {
	e.preventDefault();
}

export const VideoBlock = (props) => {
	return (
		<div className="video-block-section" onClick={e => handleVideoBlockClick(e)}>
			<div className="video-thumbnail-img-section">
				<img width="200" height="150" src={props.videoInfo.videoThumbnailImg} />
			</div>
			<div className="video-title-section">
				{props.videoInfo.videoName}
			</div>
			<div className="video-view-num-section">
				{props.videoInfo.videoViewNum} views
			</div>
		</div>
	);
};

VideoBlock.propTypes = {
	videoInfo: PropTypes.object,
};

VideoBlock.propTypes = {
	videoInfo: {
		videoId: 0,
		videoThumbnailImg: "",
		videoName: "",
		videoViewNum: 0,
	}
};
