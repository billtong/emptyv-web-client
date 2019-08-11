import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 54rem;
  padding-right: 1rem;
`;

const MYul = styled.ul`
	list-style: none;
	padding-inline-start: 0;
`;

const InfoWrapper = styled.li`
  font-weight: 600;
`;

const MsgContentWrapper = styled.li`
  text-align: right;
  color: 	#32CD32;
  font-weight: 600;
  word-wrap: break-word;
`;

const MsgTimeWrapper = styled.li`
  font-weight: 200;
  margin-bottom: .5rem;
`;

export const MessageUser = (props) => {
	return (
		<Wrapper>
			<MYul>
				<InfoWrapper>
					{props.userInfo.userName}<img alt={"user avatar"} className="user-icon" width={"30"} height={"30"} src={props.userInfo.profile.avatar}/>
				</InfoWrapper>
				<MsgContentWrapper>
					<li className="content">{props.msg.msgContent}</li>
				</MsgContentWrapper>
				<MsgTimeWrapper>
					<li className="time">{props.msg.msgTime}</li>
				</MsgTimeWrapper>
			</MYul>
		</Wrapper>
	);
};

MessageUser.propTypes = {
	userInfo: PropTypes.object,
	msg: PropTypes.object,
};

MessageUser.defaultProps = {
	userInfo: {
		userIcon: null,
		userName: null
	},
	msg: {
		msgContent: null,
		msgTime: null,
	},
};
