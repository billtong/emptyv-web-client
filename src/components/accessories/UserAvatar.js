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
        history.push(`/user/dashboard/${userId}`);
    };

    render() {
        return (
            <React.Fragment>
                <Wrapper onClick={e => this.handleUserClick(e, this.props.userInfo.id)}>
                    <img
                        alt={"user avatar"}
                        src={this.props.userInfo.profile.avatar}
                        height="100%"
                        width="100%"
                    />
                </Wrapper>
                <TextWrapper onClick={e => this.handleUserClick(e, this.props.userInfo.id)}>
                    {this.props.userInfo.profile.name}
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
        system: {
            reg: "",
            active: false,
            status: "",
            point: 0,
            achievement: []
        },
        profile: {
            avatar: "",
            name: "",
            banner: "",
            description: "",
            location: "",
            website: ""
        }
    }
};
