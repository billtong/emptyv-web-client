import React from 'react';

import { postMsg } from '../../../../api/message';
import { getSessionTokenJson } from '../../../../api/apiHelper';

class MessageInput extends React.Component {
  state = {
    msgType: 'text',
  }
  handleClick = (e) => {
    e.preventDefault();
    postMsg({
      msgContent: this.refs.content.value,
      msgType:  this.state.msgType,
      senderId: getSessionTokenJson().user.userId,
      listenerId: this.props.talkerInfo.userId
    }).then(()=>{
      this.props.updateMsg(this.props.talkerSelected);
      console.log(this.props.talkerSelected);
    }).catch(err=>{
      alert(err);
    });
    this.refs.content.value = '';
  } 
  render() {
    return (
      <div className="message-input-board">
        <textarea 
          className="text-input-area"
          ref="content"
        />
        <div
          className="send-btn"
          onClick={e=>this.handleClick(e)}
        >Send</div>
      </div>
    );
  }
}

export default MessageInput;