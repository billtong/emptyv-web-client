import React from 'react';

import MessageTalker from './MessageTalker';
import MessageUser from './MessageUser';

class MessageBoard extends React.Component {
  render() {
    const MsgList = this.props.msgListSelected && this.props.msgListSelected.length > 0 ? (
      this.props.msgListSelected.map((value, index) => {
          if(value.isSend) {
            return (
              <li className="msg-li">
                <MessageUser 
                  userInfo = {value.userInfo}
                  msg={value}
                />
              </li>
            );
          } else {
            return (
              <li className="msg-li">
                <MessageTalker 
                  talkerInfo = {value.talkerInfo}
                  msg={value}
                />
              </li>
            );
          }
      })
    ) : null;

    return (
      <ul className="message-board" id = "style-scroll">
        {MsgList}
      </ul>
    );
  }
}

export default MessageBoard;