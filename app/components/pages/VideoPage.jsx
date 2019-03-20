import React from 'react';
import { MdThumbUp, MdThumbDown, MdAdd } from 'react-icons/md';
import { connect } from 'react-redux';
import { IoIosHeart } from 'react-icons/io';
import { RingLoader, PulseLoader } from 'react-spinners';
import { Link } from 'react-router';

import ReactPlayer from '../accessories/VideoPlayer';
import Pagination from '../accessories/Pagination';
import CommentGrid from '../accessories/comment/CommentGrid';
import VideoTitle from './VideoPage/VideoTitle';
import Tag from '../accessories/Tag';
import { formatDateTime } from '../../utils/dateTools.jsx';
import { getVideoActions } from '../../actions/getVideoActions.jsx';
import { getCommentListAction, completeGetComment } from '../../actions/getCommentListAction';
import { getUserHistoryAction } from '../../actions/getUserHistoryAction';
import { getSessionTokenJson } from '../../api/apiHelper';
import { patchOtherNum } from '../../api/video.jsx';
import { postComment } from '../../api/comment';
import { getFavList, patchFavList, postFavList } from '../../api/fav';

class VideoPage extends React.Component {
  state= {
    hasLike: false,
    hasUnlike: false,
    hasFav: false,
    favDialogCss: 'notShowDialog', //showDialog and notShowDialog
    isNewFavList: false,
    favList: undefined,
    changedFavList: [],
    isBlur: true,
    isForcus: false,
  }
    
  componentWillMount() {
    document.addEventListener('keypress', this.handleEnterKey);
  }

  componentDidMount() {
    //如果有历史记录需要读一下该视频like/unLike/Fav的情况，这里先调取历史记录
    if (getSessionTokenJson() !== null) {
      this.props.getUserHistoryAction();
    }
    this.props.getVideoActions(this.props.location.query.videoId);
    this.props.getCommentListAction({ videoId: this.props.location.query.videoId });
    document.removeEventListener('keypress', this.handleEenterKey);
  }

  //如果有历史记录，获取历史记录来决定操作键的状态
  componentWillReceiveProps=(nextProps) => {
    if (nextProps.history !== undefined && nextProps.history.length > 0) {
      nextProps.history.forEach(item => {
        if (item.videoId === parseInt(this.props.location.query.videoId, 0)) {
          switch (parseInt(item.action, 0)) {
            case 2:
              this.setState(prevState => ({
              ...prevState,
              hasLike: true,
              hasUnlike: false
              }));
              break;
            case 3:
              this.setState(prevState => ({
                ...prevState,
                hasLike: false,
                hasUnlike: true
              }));
              break;
            case 4:
              this.setState(prevState => ({
                ...prevState,
                hasFav: true
              }));
              break;
            default:
              break;
          }
        }
      });
    }
  }

  //将comment回复成undefined状态，方便刷新
  componentWillUnmount() {
    this.props.completeGetComment();
  }

  //点击视频操作键的提交方法
  //切换点赞，差评按钮的状态，可以点和不能点, 
  ///收藏键一直都能点，因为用户可能回想要改变fav list，点击后还会弹出操作窗口
  handleClickAction = (e, myAction) => {
    e.preventDefault();
    const userJSON = getSessionTokenJson();
    if (!userJSON) {
      alert('please login or sign up a new account');
      return;
    }
    if (myAction === 'favourite') {
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
    const inputJson = {
      action: myAction,
      videoId: this.props.location.query.videoId,
      userId: userJSON.user.userId,
    };
    patchOtherNum(inputJson).then(() => {
      switch (myAction) {
        case 'like':
          this.setState(prevState => ({
            ...prevState,
            hasLike: true,
            hasUnlike: false
          }));
          break;
        case 'unlike':
          this.setState(prevState => ({
            ...prevState,
            hasUnlike: true,
            hasLike: false
          }));
          break;
        case 'favourite':
          this.setState(prevState => ({
            ...prevState,
            hasFav: true,
            favDialogCss: 'showDialog'
          }));
          break;
        default:
      }
    }).catch(() => {
      alert('failed, pleas login or sign up');
    });
  }

  //这个是收藏栏的提交
  //输入text了新的favlist 就post
  //点了checkbox的 就patch
  sendChangedFavList=(e) => {
    e.preventDefault();
    if (this.state.changedFavList.length > 0) {
      this.state.changedFavList.forEach((value, index) => {
        //将来最好变成一次传输，这样太浪费
        if (!value.favId) {
          postFavList({
            favList: value.favList,
            favName: value.favName,
            userId: value.userId
          }).then(() => {
            if ((index + 1) >= this.state.changedFavList.length) {
              this.setState(prevState => ({
                ...prevState,
                favDialogCss: 'notShowDialog'
              }));
            }
          }).catch();
        } else {
          patchFavList({
            favId: value.favId,
            favList: value.favList,
            favName: value.favName,
            userId: value.userId
          }).then(() => {
            if ((index + 1) >= this.state.changedFavList.length) {
              this.setState(prevState => ({
                ...prevState,
                favDialogCss: 'notShowDialog'
              }));
            }
          }).catch();
        }
      });
    }
  }

  //这个是comment的输入栏的提交法方法
  handleEnterKey=(e) => {
    if (e.keyCode === 13 && this.state.isForcus && !this.state.isBlur) {
      const comment = this.refs.comment.value;
      this.refs.comment.value = '';
      const inputJson = {
        commentContent: comment,
        videoId: this.props.location.query.videoId,
        userId: getSessionTokenJson().user.userId
      };
      postComment(inputJson)
      .then(() => {
        this.props.completeGetComment();    //先让commentList清零来重新加载commentlist
        this.props.getCommentListAction({ videoId: this.props.location.query.videoId });
      })
      .catch((err) => {
        alert(`failed post comment${err}`);
      });
    }
  };

  render() {
    const videoData = this.props.videoData;
    const loadingIcon = (this.props.isLoading) ? (
      <div className="loader">
        <RingLoader color={'#d9d9d9'} /> 
      </div>
    ) : null;
    const errText = (!this.props.error) ?
      null : (
      <div className="error">
        <div className="badge badge-danger">
          {this.props.error}
        </div>
      </div>
    );
    const videoPlayer = this.props.videoData === undefined ? null : (
      <ReactPlayer
        className='react-player'
        video={{
          thumbnail_url: videoData.videoThumbnailImg,
          video_url: videoData.videoSrc,
          video_id: videoData.videoId
        }}
      />
    );
    const favCheckList = !this.state.favList || this.state.favList.length === 0 ? null : this.state.favList.map((value, index) => {
      const videoIdArr = value.favList.split(',');
      let isCheck = false;
      videoIdArr.forEach(videoId => {
        if (this.props.location.query.videoId === videoId) {
          isCheck = true;
        }
      });
      return (
        <tr key={index}>
          <td>
            <input 
              className="check-box-section" 
              type="checkbox" 
              defaultChecked={isCheck}
              ref={`${index}-checkbox`}
              onChange={() => {
                const newChangedFavList = this.state.changedFavList;
                let newFavList = value.favList;
                const localVideoId = this.props.location.query.videoId;
                if (this.refs[`${index}-checkbox`].checked) {
                  newFavList = `${newFavList},${localVideoId}`;
                  newChangedFavList.push({
                    favId: value.favId,
                    favList: `${newFavList}`,
                    favName: `${value.favName}`,
                    userId: getSessionTokenJson().user.userId,
                  });
                }
                if (!this.refs[`${index}-checkbox`].checked && !isCheck) {
                  newChangedFavList.forEach((value1, index1) => {
                    if (value1.favName === value.favName) {
                      newChangedFavList.splice(index1, 1);
                      return;
                    }
                  });
                }
                if (!this.refs[`${index}-checkbox`].checked && isCheck) {
                  //需要减去（从ture变成false，且最开始是ture）
                  if (value.favList === localVideoId) {
                    alert('the favlist should at least have one video');
                    this.refs[`${index}-checkbox`].checked = true;
                    return;
                  } else if (value.favList.match(eval(`/^${localVideoId},/g`)) != null) {
                    newFavList = newFavList.replace(eval(`/^${localVideoId},/g`), '');             
                  } else if (value.favList.match(eval(`/,${localVideoId}$/g`)) != null) {
                    newFavList = newFavList.replace(eval(`/,${localVideoId}$/g`), '');
                  } else if (value.favList.indexOf(`,${localVideoId},`) !== -1) {
                    newFavList = newFavList.replace(`,${localVideoId},`, ',');
                  }
                  newChangedFavList.push({
                    favId: value.favId,
                    favList: `${newFavList}`,
                    favName: `${value.favName}`,
                    userId: getSessionTokenJson().user.userId,
                  });
                }
                this.setState(prevState => ({
                  ...prevState,
                  changedFavList: newChangedFavList
                }));
              }} 
            />
          </td>
        <td> 
          <div className="fav-list-name">
            {value.favName}
          </div>
        </td>
        <td>
          <div className="fav-list-num">
            {videoIdArr.length}/100
          </div>
        </td>
      </tr>
      );
    });
    const addNewFavList = this.state.isNewFavList ? (
      <tbody className="add-new-fav-list-section">
        <tr>
          <td>
            <input 
              className="new-fav-input" 
              type="text"
              autoFocus="true"
              ref="favName"
            />
          </td>
          <td>
            <input 
              type="button" 
              className="confirm-add-btn"
              value="add"
              onClick={() => {
                //改变favlist的state状态，将name和该videoId放进去
                const newItem = {
                  favList: `${this.props.location.query.videoId}`,
                  favName: this.refs.favName.value,
                  userId: getSessionTokenJson().user.userId,
                };
                const newFavList = this.state.favList;
                const newChangedFavList = this.state.changedFavList;
                newFavList.push(newItem);
                newChangedFavList.push(newItem);
                this.setState(prevState => ({
                  ...prevState,
                  favList: newFavList,
                  changedFavList: newChangedFavList,
                  isNewFavList: false
                }));
              }}
            />
          </td>
        </tr>
      </tbody>
    ) : (
      <tbody className="add-new-fav-list-section">
        <tr>
          <td>
            <div className="add-new-fav-list-section">
              <div 
              className="add-btn" 
              onClick={(e) => {
                e.preventDefault();
                this.setState(prevState => ({
                  ...prevState,
                  isNewFavList: true
                }));
              }}
              >
                <MdAdd className="add-icon" />
              </div>make a new favourite list
            </div>
          </td>
        </tr>
      </tbody>
    );
    const addFavDialog = !this.state.favList ? (
      <div className="favlist-loader">
        <PulseLoader color={'#d9d9d9'} />
      </div>
    ) : (
      <div className="modal-dialog modal-lg fav-dialog">
          <div className="modal-content">
            <div className="modal-header">
            <h4 className="modal-title">Add to Favourite List</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={(e) => {e.preventDefault(); this.setState(prevState => ({ ...prevState, favDialogCss: 'notShowDialog', isNewFavList: false })); }}>
                  &times;
              </button>
            </div>
            <div className="modal-body">
              <form role="form">
                <table className="fav-list-table">
                  <tbody>
                  {favCheckList}
                  </tbody>
                  {addNewFavList}
                </table>
                <input className="form-control" type="button" value="submit" onClick={(e) => this.sendChangedFavList(e)} />
              </form>
            </div>
          </div>
        </div>
    );
    const tagList = this.props.videoData === undefined ? null : (
      <Tag tagList={this.props.videoData.videoTag} videoId={this.props.videoData.videoId} />
    );
    const videoLittleTitle = this.props.videoData === undefined ? null : (
      <div className='video-little-title-sectiton'>
        <div className='video-view-num'>
          {videoData.videoViewNum} views
        </div>
        <div className='num video-like-num'>
          {videoData.videoLikeNum}<MdThumbUp />
        </div>
        <div className='num video-unlike-num'>
          {videoData.videoUnlikeNum}<MdThumbDown />
        </div>
        <div className='num video-fav-num'>
          {videoData.videoFavouriteNum}<IoIosHeart />
        </div>
        <div className='video-upload-data'>
          Published on {formatDateTime(parseInt(videoData.videoDate, 0))}
        </div>
        {tagList}
      </div>
    );
    const token = sessionStorage.getItem('empty-video-web-user-session');
    const commentUploadBox = (!token || token.length <= 0) ? 
      ( 
        <Link to="SignIn">Sign In To Leave a Comment</Link>
      ) : 
      (
        <div className="comment-box">
          <input 
            className="form-control comment-content"
            id="comment-box"
            placeholder="Press <Enter> to leave a comment"
            type="text"
            onKeyPress={e => this.handleEnterKey(e)}
            onFocus={() => {
              this.setState(prevState => ({
                ...prevState,
                isForcus: true,
                isBlur: false
              }));
            }}
            onBlur={() => {
              this.setState(prevState => ({
                ...prevState,
                isForcus: false,
                isBlur: true
              }));
            }}
            ref="comment" 
          />
        </div>
      );
    
    const commentPagination = (!this.props.commentList) ? null : (
      <Pagination 
        list={this.props.commentList}
        tag="comment"
      />
    );
    return (
      <div className="video-page-main-section">
        {loadingIcon}
        {errText}
        <div className="video-player-section">
          {videoPlayer}
          <div className='video-info-section'>
            <VideoTitle 
              hasLike={this.state.hasLike}
              hasUnlike={this.state.hasUnlike}
              hasFav={this.state.hasFav}
              videoData={this.props.videoData}
              handleClickAction={this.handleClickAction}
            />
            <div className={this.state.favDialogCss} role="dialog">
              {addFavDialog}
            </div>
            {videoLittleTitle}
          </div>
        </div>
        <div className="comment-section">
          <div className="comment-write-block-section">
            {commentUploadBox}
          </div>
        <CommentGrid videoId={this.props.location.query.videoId} />
        {commentPagination}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ getVideoReducer, getCommentListReducer, getUserHistoryReducer }) => {
  const { videoData, isLoading, error } = getVideoReducer;
  const { commentList } = getCommentListReducer;
  const { history } = getUserHistoryReducer;
  return { videoData, isLoading, error, commentList, history };
};

module.exports = connect(
  mapStateToProps, { 
    getVideoActions, 
    getCommentListAction, 
    completeGetComment, 
    getUserHistoryAction 
  }
)(VideoPage);
