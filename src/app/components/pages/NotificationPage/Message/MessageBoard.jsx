import React from 'react';

import MessageTalker from './MessageTalker';
import MessageUser from './MessageUser';

class MessageBoard extends React.Component {
  render() {
    console.log(this.props.msgListSelected);
    const MsgList = this.props.msgListSelected && this.props.msgListSelected.length > 0 ? (
      this.props.msgListSelected.map((value, index) => {
          if(value.isSend) {
            return (
              <li>
                <MessageUser 
                  userInfo = {value.userInfo}
                  msg={value}
                />
              </li>
            );
          } else {
            return (
              <li>
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
      <div className="message-board">
        <ul>
          {MsgList}
        </ul>
      </div>
    );
  }
}

export default MessageBoard;