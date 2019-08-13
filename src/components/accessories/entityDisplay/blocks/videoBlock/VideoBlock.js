import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import {videoStyle} from '../style.js';
import Text from '../../../Text';
import {Link} from "react-router-dom";

const Wrapper = styled.div`
	display: inline-block;
	padding: ${videoStyle.paddingVerti}px ${videoStyle.paddingHori}px; 
	cursor: pointer;
`;

const Img = styled.img`
	width: ${videoStyle.width}px;
	height:${videoStyle.height}px;
`;

const Title = styled.div`
	word-break: break-word;
	width: ${videoStyle.width}px;
	text-align: left;
	margin: 0 auto;
	overflow: hidden;
`;

const Num = styled.div`
	width: ${videoStyle.width}px;	
	text-align: left;
	margin: 0 auto;
`;

export const VideoBlock = (props) => {
    return (
        <Link to={`/video/${props.videoInfo.id}`} target="_blank">
            <Wrapper>
                <div>
                    <Img src={props.videoInfo.thumbnailSrc}/>
                </div>
                <Title>
                    {props.videoInfo.name}
                </Title>
                <Num>
                    {props.videoInfo.viewCount}
                    <Text id={"vb_views"}/>
                </Num>
            </Wrapper>
        </Link>
    );
};

VideoBlock.propTypes = {
    videoInfo: PropTypes.object,
};

VideoBlock.defaultProps = {
    videoInfo: {},
};
