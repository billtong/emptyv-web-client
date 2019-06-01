import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import {IoIosHeart} from "react-icons/io";
import {getSessionTokenJson} from "../../../utils/api/apiHelper";
import history from "../../../utils/history";
import {patchOtherNum} from "../../../utils/api/video";
import VideoFavButton from "./VideoFavButton";

const isUserA =  !getSessionTokenJson() || getSessionTokenJson() === null;

const IconWrapper = styled.div`
	display: inline-block;
	margin-inline-end: 2rem;
	font-size: 1.5rem;
	margin-block-start: 1rem;
	cursor: pointer;
`;

class VideoButton extends Component{
	state = {
		hasLike: false,
		hasUnlike: false,
		hasFav: false,
	};

	componentDidUpdate = (prevProps, prevState, snapshot)=> {
		if(this.props.history !== prevProps.history) {
			this.initHistoryState();
		}
	};

	initHistoryState = () => {
		const {history, videoId} = this.props;
		history.reverse();
		history.forEach(item => {
			if (item.videoId === parseInt(videoId, 10)) {
				switch (item.action) {
					case 2:
						this.setState({
							hasLike: true,
							hasUnlike: false
						});
						break;
					case 3:
						this.setState({
							hasLike: false,
							hasUnlike: true,
						});
						break;
					case 4:
						this.setState({
							hasFav: true
						});
						break;
					default:
						break;
				}
			}
		});
	};

	handleClickAction = (e, myAction) => {
		e.preventDefault();
		if(!isUserA) {

			if(myAction === 'favourite') {

			}

			patchOtherNum({
				action: myAction,
				videoId: this.props.videoId,
				userId: getSessionTokenJson().user.userId,
			}).then(() => {
				switch (myAction) {
					case 'like':
						this.setState({
							hasLike: true,
							hasUnlike: false
						});
						break;
					case 'unlike':
						this.setState({
							hasUnlike: true,
							hasLike: false
						});
						break;
					case 'favourite':
						this.setState({
							hasFav: true
						});
						break;
					default:
				}
			});
		} else {
			history.push('/login');
		}
	};

	render = () => {
		return (
			<Fragment>
				<div>
					<IconWrapper
						style={{color: this.state.hasLike ? 'green' : 'white'}}
						onClick={e => this.handleClickAction(e, 'like')}
					><MdThumbUp /></IconWrapper>
					<IconWrapper
						style={{color: this.state.hasUnlike ? 'red' : 'white'}}
						onClick={e => this.handleClickAction(e, 'unlike')}
					><MdThumbDown /></IconWrapper>

					<IconWrapper>
						<VideoFavButton
							hasFav={this.state.hasFav}
							videoId={this.props.videoId}
							handleClickAction={this.handleClickAction}
						/>
					</IconWrapper>
				</div>
			</Fragment>
		);
	}
}

export default VideoButton;

VideoButton.propTypes = {
	history: PropTypes.arrayOf(PropTypes.object),
	videoId: PropTypes.number,
};

VideoButton.defaultProps = {
	history: [],
	videoId: null,
};
