import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import UserAvatar from "../UserAvatar";

const Wrapper = styled.div`
	padding-left: 1rem;
	text-align: left;
	width: 54rem;
`;

const MYul = styled.ul`
	list-style: none;
	padding-inline-start: 0;
`;

const MsgContentWrapper = styled.li`
  word-wrap: break-word;
  color: red;
`;

const MsgTimeWrapper = styled.li`
  font-weight: 200;
  margin-bottom: .5rem;
`;

export const MessageTalker = (props) => {
	return (
		<Wrapper>
			<MYul>
				<UserAvatar userInfo={props.talkerInfo}/>
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

MessageTalker.propTypes = {
	talkerInfo: PropTypes.object,
	msg: PropTypes.object,
};

MessageTalker.defaultProps = {
	talkerInfo: {
		userIcon: null,
		userName: null
	},
	msg: {
		msgContent: null,
		msgTime: null,
	}
};
