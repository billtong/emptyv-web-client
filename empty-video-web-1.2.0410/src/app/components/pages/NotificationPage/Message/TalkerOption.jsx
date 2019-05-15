import React from 'react';

/**
 * props:
 * isSelected, 
 * userInfo, 
 * lastMsg
 */
class TalkerOption extends React.Component {
  render() {
    return (
      <div className={this.props.isSelected ? "talker-option selected" : "talker-option"}>
         <div className="user-avatar">
          <img 
            src={this.props.userInfo.userIcon}
            height="100%"
            width="100%"
          />
        </div>
        <div className="user-text">{this.props.userInfo.userName}</div>
        <div className="msg-text">{this.props.lastMsg}</div>
      </div>
    );
  }
}

export default TalkerOption;