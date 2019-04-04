import React from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { getUserHistoryAction } from '../../actions/getUserHistoryAction';
import { completeGetVideos } from '../../actions/getVideoListActions';
import { completeSignIn } from '../../actions/SignInActions';
import { getSessionTokenJson } from '../../api/apiHelper';
import { getFavList } from '../../api/fav';
import VideoGrid from '../accessories/videoGrid/VideoGrid';
import Pagination from '../accessories/Pagination';
import { formatDateTime } from '../../utils/dateTools';

class UserPage extends React.Component {
  state = {
    videoList: undefined,
    favList: undefined,
    action: -1,  //-1(不选) 1(观看) 2(喜欢) 3(不喜欢) 4(收藏) 5(评论)
    favListIdSelected: -1,
    favListSelected: undefined,
  }

  componentDidMount=() => {
    if (!this.props.user) {
      this.props.completeSignIn(getSessionTokenJson().user);
    }
    if (!this.props.history) {
      this.props.getUserHistoryAction();
    }
    if (!this.props.favList) {
      getFavList().then(res => {
        this.setState(prevState => (
          {
            ...prevState,
            favList: res.data
          }
        ));
      }).catch((err) => {
        alert(err);
      });
    }
  };

  //数据复原,方便刷新
  componentWillUnmount() {
    this.props.completeGetVideos();
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

    this.setState({
      videoList: list
    });
    this.props.completeGetVideos(list);
  };

  render() {
    const loadingBar = this.props.isHistoryLoading ? (
      <BarLoader color="#fff" />
    ) : null;

    const errBar = !this.props.historyError ?
    null : (
      <div className="badge badge-danger">
        {this.props.historyError}
      </div>
    );

    const menuArr = ['I view', 'I like', 'I unlike'];
    const historyMenuList = menuArr.map((value, index) => {
      const handleMenuClick = (e, newAction) => {
        e.preventDefault();
        this.generateHistoryVideoList(this.props.history, newAction);
        this.setState(prevState => ({
          ...prevState,
          action: newAction,
          favListIdSelected: -1,
          favListSelected: undefined,
        }));
      };
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
      <li>No Fav List</li>
    ) : this.state.favList.map((value, index) => {
      const handleMenuClick = (e, favId) => {
        e.preventDefault();
        this.setState(prevState => ({
          ...prevState,
          action: -1,
          favListIdSelected: favId,
          favListSelected: value,
          videoList: value.videoList
        }));
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

    const userHeader = !this.props.user ? null : (
      <div>
        <div className="user-banner-section">
          <img className="user-banner-img" src={this.props.user.userBanner} />
        </div>
        <div className="user-header-section">
          <img className="log-img" src={this.props.user.userIcon} width="100px" height="100px" />
          <span className="uid-text">#{this.props.user.userId}</span>
          <span className="username-text">{this.props.user.userName}</span>
        </div>
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
              <td>
                Published on {formatDateTime(parseInt(this.state.favListSelected.favDate, 0))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    const videoGrid = (!this.props.history || !this.state.videoList) ? null : (
      <VideoGrid />
    );

    const pagination = (!this.props.history || !this.state.videoList) ? null : (
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
        <div className="left-right-container">
          <div className="left-menu">
            <ul className="user-history-menu">
              <div className="big-menu-text">HISTORY</div>
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

const mapStateToProps = ({ getUserHistoryReducer, signInReducer }) => {
  const { isHistoryLoading, historyError, history } = getUserHistoryReducer;
  const { user } = signInReducer;
  return { isHistoryLoading, historyError, history, user };
};

export default connect(mapStateToProps, {
  getUserHistoryAction,
  completeGetVideos,
  completeSignIn
})(UserPage);
