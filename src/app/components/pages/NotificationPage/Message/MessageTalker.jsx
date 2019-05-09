import React from 'react';

class MessageTalker extends React.Component {
  render() {
    const talkerInfo = this.props.talkerInfo;
    const msg = this.props.msg;
    return (
      <div className="msg-talker msg">
        <ul>
          <li className="name">
            <img
              className="user-icon"
              src={talkerInfo.userIcon}
            />{talkerInfo.userName}
          </li>
          <li className="content">{msg.msgContent}</li>
          <li className="time">{msg.msgTime}</li>
        </ul>
      </div>
    );
  }
}

export default MessageTalker;