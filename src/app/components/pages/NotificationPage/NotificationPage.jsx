import React from 'react';

import Message from './Message/Message';
import CommentReply from './CommentReply';

class NotificationPage extends React.Component {
  state = {
    tabSelected: "message"
  }

  handleClick = (e, select) => {
    e.preventDefault();
    this.setState({ tabSelected: select });
  }

  render() {
    let content = null;
    switch(this.state.tabSelected) {
      case "message":
        content = (<Message />);
        break;
      case "comment":
        content = (<CommentReply />);
        break;
      default:
        break;
    }
    return (
      <div className="notification-section">
        <ul className="tab-section">
          <li className={this.state.tabSelected === "message" ? "select" : null} onClick={e => this.handleClick(e, "message")}>
            Message
          </li>
          <li className={this.state.tabSelected === "comment" ? "select" : null}onClick={e => this.handleClick(e, "comment")}>
            Comment
          </li>
        </ul>
        <div className="content-section">
          {content}
        </div>
      </div>
    );
  }
}

export default NotificationPage;
