import React from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { getUserHistoryAction, compeleteGetUserHistory } from '../../actions/getUserHistoryAction';
import { completeGetVideos } from '../../actions/getVideoListActions';
import { completeSignIn } from '../../actions/SignInActions';
import { getSessionTokenJson } from '../../api/apiHelper';
import VideoGrid from '../accessories/videoGrid/VideoGrid';
import Pagination from '../accessories/Pagination';
import userIconURL from '../../../asset/user.png';

class UserPage extends React.Component {
  state = {
    videoList: undefined,
    action: 1  // 1(观看) 2(喜欢) 3(不喜欢) 4(收藏) 5(评论)
  }

  componentDidMount=() => {
    //如果user state被刷新掉的话，从新从session中加上
    if (!this.props.user) {
      this.props.completeSignIn(getSessionTokenJson().user);
    }
    if (!this.props.history) {
      this.props.getUserHistoryAction();
    }
    if (this.props.history !== undefined) {
      this.generateVideoList(this.props.history, this.state.action);
    }
    this.props.completeGetVideos(this.state.videoList);
  };

  shouldComponentUpdate(nextProps, nextStates) {
    //检查state是否更新
    if (!this.props.history || !this.state.videoList || this.state.action !== nextStates.action) {
      return true;
    }
    return false;
  }

  //数据复原,方便刷新
  componentWillUnmount() {
    this.props.completeGetVideos();
    this.props.compeleteGetUserHistory();
  }

  generateVideoList=(rawVideoList, action) => {
    let list = rawVideoList.map((value) => {
      if (value.action === action) {
        return value.video;
      }
    });
    list = list.filter(video => video != null);
    this.setState({
      videoList: list
    });
  };

  render() {
    const { user, history, isHistoryLoading, historyError } = this.props;
    //初始化videoList
    if (history !== undefined && !this.state.videoList) {
      this.generateVideoList(history, this.state.action);
    }
    //更新videoList(props)
    if (this.state.videoList !== undefined) {
      this.props.completeGetVideos(this.state.videoList);
    }
    const loadingBar = isHistoryLoading ? (
      <BarLoader color="#fff" />
    ) : null;
 
    const errBar = !historyError ?
    null : (
      <div className="badge badge-danger">
        {this.props.historyError}
      </div>
    );

    const menuArr = ['I view', 'I like', 'I unlike', 'I favourite'];
    const menuList = menuArr.map((value, index) => {
      const handleMenuClick = (e, newAction) => {
        e.preventDefault();
        this.generateVideoList(this.props.history, newAction);
        this.setState(prevState => ({
          ...prevState,
          action: newAction,
        }));
      };
      if (this.state.action === index + 1) {
        return (
          <li key={index} className="user-history-menu-items selectedItem">
            {value}
          </li>
        );
      }
      return (
        <li key={index} className="user-history-menu-items" onClick={e => handleMenuClick(e, index + 1)}>
          {value}
        </li>
      );
    });

    const userHeader = !user || !history ? null : (
      <div className="user-header-section">
        <img className="log-img" src={userIconURL} width="50px" height="50px" />
        <span className="uid-text">UID: {user.userId}</span>
        <span className="username-text">USERNAME: {user.userName}</span>
        <ul className="user-history-menu">
          <div className="big-menu-text">HISTORY</div>
          {menuList}
        </ul>
      </div>
    );

    const videoGrid = (!history || !this.state.videoList) ? null : (
      <VideoGrid />
    );

    const pagination = (!history || !this.state.videoList) ? null : (
      <Pagination 
        list={this.state.videoList}
        tag="video"
      />
    );
    return (
      <div className="user-page-main-section">
        {loadingBar}
        {errBar}
        {userHeader}
        {videoGrid}
        {pagination}
      </div>
    );
  }
}

const mapStateToProps = ({ getUserHistoryReducer, signInReducer }) => {
  const { isHistoryLoading, historyError, history } = getUserHistoryReducer;
  const { user } = signInReducer;  
  return { isHistoryLoading, historyError, history, user };
};

module.exports = connect(mapStateToProps, { 
  getUserHistoryAction,
  completeGetVideos,
  compeleteGetUserHistory,
  completeSignIn
})(UserPage);
