import React from 'react';
import { BounceLoader } from 'react-spinners';

import MessageBoard from './MessageBoard';
import TalkerTab from "./TalkerTab";
import MessageInput from './MessageInput';
import { getSessionTokenJson } from '../../../../api/apiHelper';
import { getMsgList, postMsg, deleteMsg, patchMsg } from '../../../../api/message';
import { formatDateTime } from '../../../../utils/dateTools';


class Message extends React.Component {
  state = {
    rawMsgList: [],             //送后端获得的msglist数据，从旧到新排列
    talkerInfoList: [],         //talkinfo 列表
    msgListSelected: [],        //被选中的msgList
    talkerSelected: 0,          //被选中的talker，默认是第一个
    isLoading: false
  };

  componentDidMount = () => {
    this.getMsgData(this.state.talkerSelected);
  }

  getMsgData = (value) => {
    getMsgList().then(res=>{
      this.setState({ 
        rawMsgList: res.data,
        isLoading: true
      });
      this.changeListsStates(value);
    }).catch(err=>{
      this.setState({ 
        rawMsgList: [],
        isLoading: true
      });
      alert(err);
    });
  }
  
  solveTalkerInfo = (msg, userId) => {
    return msg.listenerId === userId ? msg.senderInfo : msg.listenerInfo;
  }

  changeListsStates = (selectValue) => {
    const userId = getSessionTokenJson().user.userId;
    const rawDataList = this.state.rawMsgList;
    const msgMap = new Map();       //(talkerId, 和该talker的msgList)
    const talkersMap = new Map();
    rawDataList.forEach((msg) => {
      const talkerInfo = this.solveTalkerInfo(msg, userId);
      talkersMap.set(talkerInfo.userId, talkerInfo);
      let arr = msgMap.get(talkerInfo.userId);
      if(!arr || arr === null || arr.size === 0) {
        arr = [msg];
      } else {
        arr.push(msg);
      }
      msgMap.set(talkerInfo.userId, arr);
    });
    const talkerInfoListArr = [];
    talkersMap.forEach((value)=>{
      talkerInfoListArr.push(value);
    });
    this.setState({
      talkerInfoList: talkerInfoListArr,
      talkerSelected: selectValue,
      msgListSelected: msgMap.get(talkerInfoListArr[selectValue].userId),
    });
  }

  generatedFinalList = (list) => {
    const userId = getSessionTokenJson().user.userId;
    const newList = list.map((msg, index) => {
      return {
        msgId: msg.msgId,
        talkerInfo: this.solveTalkerInfo(msg, userId),
        userInfo: getSessionTokenJson().user,
        msgContent: msg.msgContent,
        msgTime: formatDateTime(msg.msgTime),
        msgType: "text",
        isSend: msg.senderId === userId
      }
    });
    return newList.reverse();
  }

  changeTalkerSelectedState = (value) => {
    this.changeListsStates(value);
  }

  render() {
    return (
      <div className="message-container">
        <TalkerTab 
           talkerInfoList = {this.state.talkerInfoList} 
           changeTalkerSelectedState = {this.changeTalkerSelectedState}
           talkerSelected = {this.state.talkerSelected}
        />
        <div className="message-board-section">
          <MessageBoard 
            msgListSelected = {this.generatedFinalList(this.state.msgListSelected)}
          />
          <MessageInput 
            updateMsg={this.getMsgData}
            talkerSelected={this.state.talkerSelected}
            talkerInfo = {this.state.talkerInfoList[this.state.talkerSelected]}
          />
        </div>
      </div>
    );
  }
}

export default Message;
