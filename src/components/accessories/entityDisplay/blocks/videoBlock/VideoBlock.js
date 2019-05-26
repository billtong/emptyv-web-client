import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import {videoStyle} from '../style.js';

const Wrapper = styled.div`
	display: inline-block;
	padding: ${videoStyle.paddingVerti}px ${videoStyle.paddingHori}px; 
`;

const Img = styled.img`
	width: ${videoStyle.width}px;
	height:${videoStyle.height}px;
`;

const Title = styled.div`
	word-break: break-word;
	width: ${videoStyle.width}px;
	text-align: left;
	height: 2.2rem;
	margin: 0 auto;
	overflow: hidden;
`;

const Num = styled.div`
	width: ${videoStyle.width}px;	
	text-align: left;
	margin: 0 auto;
`;

const handleVideoBlockClick = (e, videoId) => {
	e.preventDefault();
}

export const VideoBlock = (props) => {
	return (
		<Wrapper onClick={e => handleVideoBlockClick(e)}>
			<div>
				<Img src={props.videoInfo.videoThumbnailImg}/>
			</div>
			<Title>
				{props.videoInfo.videoName}
			</Title>
			<Num>
				{props.videoInfo.videoViewNum} views
			</Num>
		</Wrapper>
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
