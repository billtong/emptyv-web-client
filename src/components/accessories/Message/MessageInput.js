import React from 'react';
import styled from "styled-components";
import {postMsg} from '../../../utils/api/message';
import {getSessionTokenJson} from '../../../utils/api/apiHelper';
import history from "../../../utils/history";
import {grey} from "./style";

const InputArea = styled.textarea`
  background:${grey};
  outline: none;
  border-color: black;
  color: 	#32CD32;
  font-weight: 600;
  opacity: 0.9;
  font-size: 1rem;
  resize: none;
  height: 10rem;
  width: 100%;
`;

const SendBtn = styled.span`
  cursor: pointer;
  font-weight: 100;
  &:hover {
    color: #32CD32;
  }
`;

class MessageInput extends React.Component {
	state = {
		msgType: 'text',
	};

	handleClick = (e) => {
		e.preventDefault();
		if (!this.refs.content.value || this.refs.content.value === null || this.refs.content.value === '' || this.refs.content.value.trim().size === 0) {
			alert("please say something!");
			return;
		}
		postMsg({
			msgContent: this.refs.content.value,
			msgType: this.state.msgType,
			senderId: getSessionTokenJson().user.userId,
			listenerId: this.props.talkerInfo.userId
		}).then(() => {
			this.props.updateMsg(this.props.talkerSelected);
			history.push('/user/message');
		}).catch(err => {
			alert(err);
		});
		this.refs.content.value = '';
	};

	render() {
		return (
			<div className="message-input-board">
				<SendBtn onClick={e => this.handleClick(e)}>Send</SendBtn>
				<InputArea ref="content"/>
			</div>
		);
	}
}

export default MessageInput;
