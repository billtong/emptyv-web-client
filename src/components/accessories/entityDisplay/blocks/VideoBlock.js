import React, {Fragment, Component} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

const style = {
	width: "200px",
	height: "150px",
};

const Wrapper = styled.div`
	display: inline-block;
	padding: 1rem 2rem;
`;

const Img = styled.img`
	width: ${style.width};
	height:${style.height};
`;

const Title = styled.div`
	word-break: break-word;
	width: ${style.width};
	text-align: left;
	height: 2.2rem;
	margin: 0 auto;
	overflow: hidden;
`;

const Num = styled.div`
	width: ${style.width};	
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
				<Img src={props.videoInfo.videoThumbnailImg} />
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
