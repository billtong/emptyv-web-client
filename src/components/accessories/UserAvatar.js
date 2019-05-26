import React from 'react';
import Styled from 'styled-components';
import history from '../../utils/history';
import PropTypes from 'prop-types';

const Wrapper = Styled.div`
	border-radius: 100%;
	height: 3rem;
	width: 3rem;
	display: inline-block;
	vertical-align: top;
	margin-left: 1rem;
	cursor: pointer;
`;

const TextWrapper = Styled.div`
	margin-left: 1rem;
	display: inline-block;
	font-weight: 500;
	font-size: 1.1rem;
	cursor: pointer;
`;

class UserAvatar extends React.Component {
	handleUserClick = (e, userId) => {
		e.preventDefault();
		if (userId > 0) {
			history.push(`/user/dashboard/${userId}`);
		}
	};

	render() {
		return (
			<React.Fragment>
				<Wrapper onClick={e => this.handleUserClick(e, this.props.userInfo.userId)}>
					<img
						src={this.props.userInfo.userIcon}
						height="100%"
						width="100%"
					/>
				</Wrapper>
				<TextWrapper onClick={e => this.handleUserClick(e, this.props.userInfo.userId)}>
					{this.props.userInfo.userName}
				</TextWrapper>
			</React.Fragment>
		);
	}
}

export default UserAvatar;

UserAvatar.propTypes = {
	userInfo: PropTypes.object,
};

UserAvatar.defaultProps = {
	userInfo: {
		userId: null,
		userIcon: null,
		userName: null,
	}
};
