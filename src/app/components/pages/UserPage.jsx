import React from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { getUserHistoryAction, compeleteGetUserHistory } from '../../actions/getUserHistoryAction';
import { completeGetVideos } from '../../actions/getVideoListActions';
import { completeSignIn } from '../../actions/SignInActions';
import { getSessionTokenJson } from '../../api/apiHelper';
import { getFavList } from '../../api/fav';
import VideoGrid from '../accessories/videoGrid/VideoGrid';
import Pagination from '../accessories/Pagination';
import userIconURL from '../../../asset/user.png';
import { formatDateTime } from '../../utils/dateTools';

class UserPage extends React.Component {
  state = {
    videoList: undefined,
    favList: undefined,
    action: 1,  // 1(观看) 2(喜欢) 3(不喜欢) 4(收藏) 5(评论)
    favListIdSelected: -1,
    favListSelected: undefined,
  }

  componentDidMount=() => {
    //if user state is deleted by refreshing，a new one need to be added
    if (!this.props.user) {
      this.props.completeSignIn(getSessionTokenJson().user);
    }
    //get history action
    if (!this.props.history) {
      this.props.getUserHistoryAction();
    }
    //get favList
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

  //redux update component
  componentWillReceiveProps(nextProps) {
    if (nextProps.history !== undefined) {
      this.generateHistoryVideoList(nextProps.history, this.state.action);
    }
  }

  //数据复原,方便刷新
  componentWillUnmount() {
    this.props.completeGetVideos();
    this.props.compeleteGetUserHistory();
  }

  generateHistoryVideoList=(rawVideoList, action) => {
    let list = rawVideoList.map((value) => {
      if (value.action === action) {
        return value.video;
      }
    });
    list = list.filter(video => video != null);
    this.setState(prevState => ({
      ...prevState,
      videoList: list
    }));
  };

  render() {
    const { user, history, isHistoryLoading, historyError } = this.props;

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

    const userHeader = !user || !history ? null : (
      <div className="user-header-section">
        <img className="log-img" src={userIconURL} width="50px" height="50px" />
        <span className="uid-text">UID: {user.userId}</span>
        <span className="username-text">USERNAME: {user.userName}</span>
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
  compeleteGetUserHistory,
  completeSignIn
})(UserPage);
