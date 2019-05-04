import React from 'react';
import { hashHistory } from 'react-router';

class UserAvatar extends React.Component {
  handleUserClick = (e, userId) => {
    e.preventDefault();
    if(userId === 0) {
      hashHistory.push('404');
    } else {
      hashHistory.push(`UserPage/${userId}`);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div 
          className="user-avatar" 
          onClick={e=>this.handleUserClick(e, this.props.userInfo.userId)}
        >
         <img 
            src={this.props.userInfo.userIcon}
            height="100%"
            width="100%"
          />
        </div>
        <div className="user-text" onClick={e=>this.handleUserClick(e, this.props.userInfo.userId)}>
          {this.props.userInfo.userName}
        </div>
      </React.Fragment>
    );
  }
}

export default UserAvatar;