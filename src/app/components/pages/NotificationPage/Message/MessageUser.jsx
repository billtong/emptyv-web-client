import React from 'react';

class MessageUser extends React.Component {
  render() {
    const userInfo = this.props.userInfo;
    const msg = this.props.msg;
    return (
      <div className="msg-user msg">
        <ul>
          <li className="content">{msg.msgContent}</li>
          <li className="name">{userInfo.userName}</li>
          <li className="time">{msg.msgTime}</li>
        </ul>
      </div>
    );
  }
}

export default MessageUser;