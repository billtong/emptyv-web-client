import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {MdThumbDown, MdThumbUp} from 'react-icons/md';
import {getSessionTokenJson} from "../../../utils/api/apiHelper";
import history from "../../../utils/history";
import {patchVideoCount} from "../../../utils/api/video";
import VideoFavButton from "./VideoFavButton";
import operation from "../../../assets/operations";

const IconWrapper = styled.div`
	display: inline-block;
	margin-inline-end: 2rem;
	font-size: 1.5rem;
	margin-block-start: 1rem;
	cursor: pointer;
`;

class VideoButton extends Component {
	state = {
		hasLike: false,
		hasUnlike: false,
		hasFav: false,
	};

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (this.props.history !== prevProps.history) {
			this.initHistoryState();
		}
		if (this.props.favLists !== prevProps.favLists) {
			this.initFavListState();
		}
	};

	initHistoryState = () => {
		const {history, videoId} = this.props;
		history.forEach(item => {
			switch (item.operation) {
				case operation.LIKE_A_VIDEO:
					if (item.object.id === videoId) {
						this.setState({
							hasLike: true,
							hasUnlike: false
						});
					}
					break;
				case operation.UNLIKE_A_VIDEO:
					if (item.object.id === videoId) {
						this.setState({
							hasLike: false,
							hasUnlike: true,
						});
					}
					break;
				default:
					break;
			}
		});
	};

	initFavListState = () => {
		const {favLists, videoId} = this.props;
		console.log(favLists);
		favLists.forEach(item => {
			if (item.videoIds.indexOf(videoId) !== -1) {
				this.setState({
					hasFav: true
				});
			}
		});
	};

	handleClickAction = (e, myOperation) => {
		e.preventDefault();
		console.log();
		const isUserA = !getSessionTokenJson() || getSessionTokenJson() === null;
		if (!isUserA) {
			if (myOperation === operation.FAV_A_VIDEO) {
				this.setState({
					hasFav: true,
				});
				return;
			}
			if (myOperation === operation.CANCEL_FAV_A_VIDEO) {
				this.setState({
					hasFav: false,
				});
				return;
			}
			patchVideoCount({
				operation: myOperation,
				videoId: this.props.videoId,
			}).then(() => {
				switch (myOperation) {
					case operation.LIKE_A_VIDEO:
						if (this.state.hasUnlike) {
							patchVideoCount({
								operation: operation.CANCEL_UNLIKE_A_VIDEO,
								videoId: this.props.videoId,
							});
						}
						this.setState({
							hasLike: true,
							hasUnlike: false
						});
						break;
					case operation.UNLIKE_A_VIDEO:
						if (this.state.hasLike) {
							patchVideoCount({
								operation: operation.CANCEL_LIKE_A_VIDEO,
								videoId: this.props.videoId,
							});
						}
						this.setState({
							hasUnlike: true,
							hasLike: false
						});
						break;
					case operation.CANCEL_LIKE_A_VIDEO:
						this.setState({
							hasLike: false
						});
						break;
					case operation.CANCEL_UNLIKE_A_VIDEO:
						this.setState({
							hasUnlike: false,
						});
						break;
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
						onClick={e => !this.state.hasLike ? this.handleClickAction(e, operation.LIKE_A_VIDEO) : this.handleClickAction(e, operation.CANCEL_LIKE_A_VIDEO)}
					><MdThumbUp/></IconWrapper>
					<IconWrapper
						style={{color: this.state.hasUnlike ? 'red' : 'white'}}
						onClick={e => !this.state.hasUnlike ? this.handleClickAction(e, operation.UNLIKE_A_VIDEO) : this.handleClickAction(e, operation.CANCEL_UNLIKE_A_VIDEO)}
					><MdThumbDown/></IconWrapper>

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
	};
}

export default VideoButton;

VideoButton.propTypes = {
	history: PropTypes.arrayOf(PropTypes.object),
	videoId: PropTypes.string,
};

VideoButton.defaultProps = {
	history: [],
	videoId: null,
};
