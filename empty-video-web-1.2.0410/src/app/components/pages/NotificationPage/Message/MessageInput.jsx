import React from 'react';
import { hashHistory } from 'react-router';

import { postMsg } from '../../../../api/message';
import { getSessionTokenJson } from '../../../../api/apiHelper';

class MessageInput extends React.Component {
  state = {
    msgType: 'text',
  }
  handleClick = (e) => {
    e.preventDefault();
    if(!this.refs.content.value || this.refs.content.value === null || this.refs.content.value === '' || this.refs.content.value.trim().size === 0) {
      alert("please say something!");
      return;
    }
    postMsg({
      msgContent: this.refs.content.value,
      msgType:  this.state.msgType,
      senderId: getSessionTokenJson().user.userId,
      listenerId: this.props.talkerInfo.userId
    }).then(()=>{
      this.props.updateMsg(this.props.talkerSelected);
      hashHistory.push('/UserPage/notification');
      console.log(this.props.talkerSelected);
    }).catch(err=>{
      alert(err);
    });
    this.refs.content.value = '';
  } 
  render() {
    return (
      <div className="message-input-board">
        <span
          className="send-btn"
          onClick={e=>this.handleClick(e)}
        >Send</span>
        <textarea 
          className="text-input-area"
          ref="content"
        />
      </div>
      
    );
  }
}

export default MessageInput;