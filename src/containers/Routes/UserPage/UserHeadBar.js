import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import history from "../../../utils/history";
import {getSessionTokenJson} from "../../../utils/api/apiHelper";

const UserBannerWrapper = styled.div`
	height: 15rem;
`;

const UserHeaderWrapper = styled.div`
	padding: 1rem 7rem 0rem 7rem;
	background: #313131;
	text-align: left;
	display: flex;
	justify-content: space-between;
`;

const UserImg = styled.img`
	width: 100px; 
	height: 100px;
	border-radius: 100%;
	display: inline-block;
`;

const UserId = styled.span`
	display: inline-block;
	margin-left: 1rem;
	font-size: 1.5rem;
	font-weight: 100;
`;

const UserName = styled.span`
	font-size: 1.5rem;
	font-weight: 500;
	margin-left: 1rem;
	color: #d9d9d9;
`;

const RightWrapper = styled.div`
	position: relative;
	width: 10rem;
`;

const MessageBtn = styled.div`
	cursor: pointer;
	position: absolute;
	bottom: 1rem;
	padding: 0.5rem 1rem;
	border: 0.15rem solid #d9d9d9;
	border-radius: 1rem;
	&:hover {
		color: #d9d9d9;
	}
`;

class UserHeadBar extends Component {
	handleMessageClick = (e, userInfo) => {
		e.preventDefault();
		const isUserA = !getSessionTokenJson() || getSessionTokenJson() === null;
		if (!isUserA) {
			history.push({
				pathname: `/user/message/${userInfo.id}`,
				state: userInfo
			});
		} else {
			history.push('/login');
		}
	};


	render = () => {
		return (
			<Fragment>
				<UserBannerWrapper>
					<img width="100%" height="100%" className="user-banner-img"
					     src={this.props.user.profile && this.props.user.profile.banner}/>
				</UserBannerWrapper>
				<UserHeaderWrapper>
					<div>
						<UserImg src={this.props.user.profile && this.props.user.profile.avatar}/>
						<UserName>{this.props.user.profile && this.props.user.profile.name}</UserName>
					</div>
					<RightWrapper>
						<MessageBtn onClick={e => this.handleMessageClick(e, this.props.user)}>Message</MessageBtn>
					</RightWrapper>
				</UserHeaderWrapper>
			</Fragment>
		);
	}
}

export default UserHeadBar;

UserHeadBar.propsTypes = {
	user: PropTypes.object,
};

UserHeadBar.defaultProps = {
	user: {
		system: {
			reg: "",
			active: false,
			status: "",
			point: 0,
			achievement: []
		},
		profile: {
			name: "",
			avatar: "",
			banner: "",
			description: "",
			location: "",
			website: ""
		}
	}
};
