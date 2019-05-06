import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { getUserHistory, getUserPublic } from '../../../api/user';
import { updateVideoListAction } from '../../../actions/getVideoListActions';
import { getSessionTokenJson } from '../../../api/apiHelper';
import { getFavList } from '../../../api/fav';
import { getVideoListAction } from '../../../actions/getVideoListActions';
import VideoGrid from '../../accessories/videoGrid/VideoGrid';
import Pagination from '../../accessories/Pagination';
import { formatDateTime } from '../../../utils/dateTools';

class UserPage extends React.Component {
  state = {
    history: undefined,
    favList: undefined,
    videoList: undefined,
    uploadsSelected: true,
    action: -1,  //-1(不选) 1(观看) 2(喜欢) 3(不喜欢) 5(评论)
    favListIdSelected: -1,  //index
    favListSelected: undefined,
    user: null   //这里的user有两种，public的和private的
  }

  //同步state和props
  componentWillReceiveProps = (nextProps) =>{
    if(nextProps.videoList !== this.state.videoList) {
      this.setState({ videoList: nextProps.videoList });
    }
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
    this.props.getVideoListAction({
      filter: "date",
      userId: aUserId
    });
    getFavList({
        userId: aUserId
      }).then(res => {
        this.setState({
           favList: res.data
        });
      }).catch((err) => {
        alert(err);
      });
  };

  componentWillUnmount() {
    this.props.updateVideoListAction();
  }

  loadUploadList = (e, userId) => {
    e.preventDefault();
    this.props.getVideoListAction({
      filter: "date",
      userId: userId
    });
    this.setState({
      uploadsSelected: true,
      action: -1,
      favListIdSelected: -1,
      favListSelected: undefined,
    });
  }

  handleMenuClick = (e, str) => {
    e.preventDefault();
    switch(str){
      case 'history':
        this.setState({
          uploadsSelected: false,
          action: 0,
          favListIdSelected: -1
        });
        break;
      case 'fav':
      this.setState({
        uploadsSelected: false,
        action: -1,
        favListIdSelected: 0,
      });
        break;
      default:
       break;
    };
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
    const uploadsMenu = !this.state.user ? null : (
      <li 
        class="big-menu-text" 
        style={{ color: this.state.uploadsSelected ? "orangered" : "white" }}
        onClick={e => this.loadUploadList(e, this.state.user.userId)}
      >UPLOADS</li>
    );
    const historyMenu = !this.state.history ? null : (
      <li 
        className="big-menu-text"
        style={{ color: this.state.action !== -1 ? "orangered" : "white" }}
        onClick={e => this.handleMenuClick(e, 'history')}
      >HISTORY</li>
    );
    const HistMenuArr = ['view', 'like', 'unlike'];
    const historyMenuList = this.state.history === undefined ? null : HistMenuArr.map((value, index) => {
      if (this.state.action === index + 1) {
        return (
          <li key={index} className="user-menu-items selectedItem">
            {value}
          </li>
        );
      }
      const handleHistoryMenuClick = (e, newAction) => {
        e.preventDefault();
        this.setState(prevState => ({
          ...prevState,
          action: newAction,
          favListIdSelected: -1,
          favListSelected: undefined,
          uploadsSelected: false
        }));
        this.generateHistoryVideoList(this.state.history, newAction);
      };
      return (
        <li key={index} className="user-menu-items" onClick={e => handleHistoryMenuClick(e, index + 1)}>
          {value}
        </li>
      );
    });
    const favMenuList = this.state.favList === undefined || this.state.favList.length === 0 ? (
      <li className="user-menu-items-empty">empty</li>
    ) : this.state.favList.map((value, index) => {
      if (this.state.favListIdSelected === value.favId) {
        return (
          <li key={index} className="user-menu-items selectedItem">
            {value.favName}
          </li>
        );
      }
      const handleFavMenuClick = (e, favId) => {
        e.preventDefault();
        this.setState({
          action: -1,
          favListIdSelected: favId,
          favListSelected: value,
          videoList: value.videoList,
          uploadsSelected: false
        });
        this.props.updateVideoListAction(value.videoList);
      };
      return (
        <li key={index} className="user-menu-items" ref={index} onClick={(e) => handleFavMenuClick(e, value.favId)}>
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
    );
    let subMenu = null;
    if (this.state.action !== -1) {
      subMenu = historyMenuList;
    } else if (this.state.favListIdSelected !== -1) {
      subMenu = favMenuList;
    }
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
        <div className="left-right-container">
          <div className="left-menu">
          {userInfo}   
          </div>
          <div className="right-grid-display">
            <ul className="right-grid-display-menu"> 
              <li className="right-grid-display-list">
                {uploadsMenu}
              </li>
              <li className="right-grid-display-list">
                {historyMenu}
              </li>
              <li className="right-grid-display-list">
                <li 
                  className="big-menu-text"
                  style={{ color: this.state.favListIdSelected !== -1 ? "orangered" : "white" }}
                  onClick={e => this.handleMenuClick(e, 'fav')}
                >FAVORITE</li>
              </li>
            </ul>
            <ul className="right-grid-display-menu">
              {subMenu}
            </ul>
            {videoGridInfo}
            {videoGrid}
            {pagination}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ getVideoListReducer })=> {
  const { word, videoList } = getVideoListReducer;
  return { word, videoList };
};

export default connect(mapStateToProps, {
  updateVideoListAction,
  getVideoListAction
})(UserPage);
