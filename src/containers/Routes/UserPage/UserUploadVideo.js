import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import Video from "../../../components/accessories/video";
import {getVideoList} from "../../../utils/api/video";

export const VideoWrapper = styled.div`
	width: 1040px;
	border: 1px solid #313131;
	border-radius: 4px;
	text-align: left;
	margin-bottom: 2rem;
`;

export const TitleText = styled.div`
	margin-left: 1rem;
	font-size: 1.5rem;
	font-weight: 500;
	margin-top: 1rem;
	margin-inline-start: 2rem;
`;

class UserUploadVideo extends Component{
	state = {
		videoList: [],
		isLoading: false,
		errMsg: null,
	};

	componentDidMount = () => {
		this.setState({
			isLoading: true,
		});
		getVideoList({
			filter: "date",
			userId: this.props.userId,
		}).then(res => {
			this.setState({
				videoList: res.data.videoList,
				isLoading: false,
			});
		}).catch(err=>{
			this.setState({
				isLoading: false,
				errMsg: err.message,
			});
		});
	};

	render = () => {
		return (
			<Fragment>
				<VideoWrapper>
					<TitleText>Upload</TitleText>
					<Video
						videoList={this.state.videoList}
						isLoading={this.state.isLoading}
						errMsg={this.state.errMsg}
						pageSize={3}
					/>
				</VideoWrapper>
			</Fragment>
		);
	}
}

export default UserUploadVideo;

UserUploadVideo.propsTypes = {
	userId: PropTypes.number,
};

UserUploadVideo.defaultProps = {
	userId: null,
};
