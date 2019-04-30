import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { getUserHistory, getUserPublic } from '../../api/user';
import { updateVideoListAction } from '../../actions/getVideoListActions';
import { getSessionTokenJson } from '../../api/apiHelper';
import { getFavList } from '../../api/fav';
import VideoGrid from '../accessories/videoGrid/VideoGrid';
import Pagination from '../accessories/Pagination';
import { formatDateTime } from '../../utils/dateTools';

class UserPage extends React.Component {
  state = {
    history: undefined,
    favList: undefined,
    videoList: undefined,
    action: -1,  //-1(不选) 1(观看) 2(喜欢) 3(不喜欢) 5(评论)
    favListIdSelected: -1,  //index
    favListSelected: undefined,
    user: null   //这里的user有两种，public的和private的
  }

  componentDidMount=() => {
    document.documentElement.scrollTop = 0;
    let aUserId = null;
    if(this.props.routeParams.userId !== undefined) {
      aUserId = parseInt(this.props.routeParams.userId, 10);
      getUserPublic({
        userId: aUserId
      }).then((res) => {
        this.setState({ user: res.data});
      }).catch((err)=>{
        hashHistory.push('404');
      });
    } else if (getSessionTokenJson() !== null) {
      aUserId = getSessionTokenJson().user.userId;
      this.setState({ user: getSessionTokenJson().user});
      getUserHistory().then(res => {
        this.setState({ 
          history: res.data
        });
      }).catch((err) => {
        alert(err);
      });
    }
    getFavList({
        userId: aUserId
      }).then(res => {
        this.setState({
           favList: res.data
        });
      }).catch((err) => {
        alert(err);
      });
      //reset the props from redux
      this.props.updateVideoListAction();
  };

  componentWillUnmount() {
    this.props.updateVideoListAction();
  }

  generateHistoryVideoList=(rawVideoList, action) => {
    let list = rawVideoList.map((value) => {
      if (value.action === action) {
        return value.video;
      }
    });
    list = list.filter(video => video != null);
    for(let index = list.length-1; index >= 0; index--) {
      if (index >= 1 && list[index-1].videoId === list[index].videoId) {
        list.splice(index, 1);
      }
    }
    this.setState({videoList: list});
    this.props.updateVideoListAction(list);
  };

  render() {
    const menuArr = ['view', 'like', 'unlike'];
    const historyMenuList = this.state.history === undefined ? null : menuArr.map((value, index) => {
      const handleMenuClick = (e, newAction) => {
        e.preventDefault();
        this.setState(prevState => ({
          ...prevState,
          action: newAction,
          favListIdSelected: -1,
          favListSelected: undefined,
        }));
        this.generateHistoryVideoList(this.state.history, newAction);
      };
      if(index === 0) {
        return (
          <div>
            <div className="big-menu-text">HISTORY</div>
            <li key={index} className="user-menu-items" onClick={e => handleMenuClick(e, index + 1)}>
              {value}
            </li>
          </div>
        )
      }
      if (this.state.action === index + 1) {
        return (
          <li key={index} className="user-menu-items selectedItem">
            {value}
          </li>
        );
      }
      return (
        <li key={index} className="user-menu-items" onClick={e => handleMenuClick(e, index + 1)}>
          {value}
        </li>
      );
    });
    const favMenuList = this.state.favList === undefined || this.state.favList.length === 0 ? (
      <li className="user-menu-items-empty">empty</li>
    ) : this.state.favList.map((value, index) => {
      const handleMenuClick = (e, favId) => {
        e.preventDefault();
        this.setState({
          action: -1,
          favListIdSelected: favId,
          favListSelected: value,
          videoList: value.videoList
        });
        this.props.updateVideoListAction(value.videoList);
      };
      if (this.state.favListIdSelected === value.favId) {
        return (
          <li key={index} className="user-menu-items selectedItem">
            {value.favName}
          </li>
        );
      }
      return (
        <li key={index} className="user-menu-items" onClick={(e) => handleMenuClick(e, value.favId)}>
          {value.favName}
        </li>
      );
    });
    const userHeader = !this.state.user ? null : (
      <div>
        <div className="user-banner-section">
          <img className="user-banner-img" src={this.state.user.userBanner} />
        </div>
        <div className="user-header-section">
          <img className="log-img" src={this.state.user.userIcon} width="100px" height="100px" />
          <span className="uid-text">#{this.state.user.userId}</span>
          <span className="username-text">{this.state.user.userName}</span>
        </div>
      </div>
    );
    const userInfo = !this.state.user ? null : (
      <div>
        <table className="userInfo-table">
          <tr>
          <td className="title-td">Bio</td>
            <td className="text-td">
              <p className="bio-text">
                {this.state.user.userDesc}
              </p>
            </td>
          </tr>
          <tr>
            <td className="title-td">Location</td>
            <td className="text-td">{this.state.user.userLoc}</td>
          </tr>
          <tr>
            <td className="title-td">Website</td>
            <td className="text-td">{this.state.user.userSite}</td>
          </tr>
        </table>
      </div>
    );
    const videoGridInfo = this.state.favListSelected === undefined ? null : (
      <div className="grid-info">
        <table>
          <tbody>
            <tr>
              <td className="title-td">
                {this.state.favListSelected.favName}
              </td>
            </tr>
            <tr>
              <td className="text-td">
                {this.state.favListSelected.videoList.length} videos
              </td>
              <td className="text-td">
                Published on {formatDateTime(parseInt(this.state.favListSelected.favDate, 0))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    const videoGrid = (!this.state.videoList) ? null : (
      <VideoGrid />
    );
    const pagination = (!this.state.videoList) ? null : (
      <Pagination
        list={this.state.videoList}
        tag="video"
      />
    );
    return (
      <div className="user-page-main-section">
        {userHeader}
        {userInfo}        
        <div className="left-right-container">
          <div className="left-menu">
            <ul className="user-history-menu">
              {historyMenuList}
              <div className="big-menu-text">FAV LIST</div>
              {favMenuList}
            </ul>
          </div>
          <div className="right-grid-display">
            {videoGridInfo}
            {videoGrid}
            {pagination}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  updateVideoListAction
})(UserPage);
