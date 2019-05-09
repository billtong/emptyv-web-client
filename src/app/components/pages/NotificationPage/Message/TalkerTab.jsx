import React from 'react';

import TalkerOption from './TalkerOption';
/**
 * props: 
 * talkerInfoList,  talkerInfo表
 * changeTalkerSelectedState
 * talkerSelected
 */
class TalkerTab extends React.Component {
  handleClick = (e, value) => {
    e.preventDefault();
    this.props.changeTalkerSelectedState(value);
  }
  render() {
    const talkOptionList = (!this.props.talkerInfoList || this.props.talkerInfoList.length === 0) ? (
      <div>empty list</div>
    ) : (
      this.props.talkerInfoList.map((talker, index) => {
        return (
          <li onClick = {e => this.handleClick(e, index)}>
            <TalkerOption
              isSelected = {this.props.talkerSelected === index} 
              userInfo = {talker}
            />
          </li>
        );
      })
    );
    return (
      <div className="talker-tab">
        <ul>
          {talkOptionList}
        </ul>
      </div>
    );
  }
}

export default TalkerTab;