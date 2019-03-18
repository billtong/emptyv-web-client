import React from 'react';
import { MdThumbUp, MdThumbDown, MdAdd } from 'react-icons/md';
import { connect } from 'react-redux';
import { IoIosHeart } from 'react-icons/io';
import { RingLoader, PulseLoader } from 'react-spinners';
import { Link } from 'react-router';

import ReactPlayer from '../accessories/VideoPlayer';
import Pagination from '../accessories/Pagination';
import CommentGrid from '../accessories/comment/CommentGrid';
import Tag from '../accessories/Tag';
import { formatDateTime } from '../../utils/dateTools.jsx';
import { getVideoActions } from '../../actions/getVideoActions.jsx';
import { getCommentListAction, completeGetComment } from '../../actions/getCommentListAction';
import { getUserHistoryAction } from '../../actions/getUserHistoryAction';
import { getSessionTokenJson } from '../../api/apiHelper';
import { patchOtherNum } from '../../api/video.jsx';
import { postComment } from '../../api/comment';

class VideoPage extends React.Component {
  state= {
    hasLike: false,
    hasUnlike: false,
    hasFav: false,
    favDialogCss: 'notShowDialog',
    isNewFavList: false,
    isBlur: true,
    isForcus: false,
    favList: undefined
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
  submitFavList=() => {

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
    const likeIcon = this.state.hasLike ? (
      <div className='video-action-action actioned'>
        <MdThumbUp />Good 
      </div>
    ) : (
      <div className='video-action-action' onClick={e => this.handleClickAction(e, 'like')}>
      <MdThumbUp />Good 
    </div>
    );
    const unlikeIcon = this.state.hasUnlike ? (
      <div className='video-action-action actioned'>
        <MdThumbDown />
      </div>
    ) : (
      <div className='video-action-action thumb-down-action' onClick={e => this.handleClickAction(e, 'unlike')}>
        <MdThumbDown />
      </div>
    );
    const favIcon = this.state.hasFav ? (
      <div className='video-action-action love-action actioned'>
        <IoIosHeart onClick={e => this.handleClickAction(e, 'favourite')} />
      </div>
    ) : (
      <div className='video-action-action love-action' onClick={e => this.handleClickAction(e, 'favourite')}>
        <IoIosHeart data-toggle="modal" />
      </div>
    );
    const addNewFavList = this.state.isNewFavList ? (
      <div>
        <input 
          className="form-control" 
          type="text"
          autoFocus="true"
          ref="favName"
        />
        <input 
          type="button" 
          className="form-control"
          value="add"
          onClick={()=>{
            //改变favlist的state状态，把这个也放到favlist里面并赋值为 1
          }}
        />
      </div>
    ) : (
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
    );
    const addFavDialog = !this.state.favList ? (
      <div className="favlist-loader">
        <PulseLoader color={'#d9d9d9'} />
      </div>
    ) : (
      <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
            <h4 className="modal-title">Add to Favourite List</h4>
              <button type="button" className="close" data-dismiss="modal" onClick={(e) => {e.preventDefault();this.setState(prevState => ({...prevState,favDialogCss: 'notShowDialog',isNewFavList: false}));}}>
                  &times;
              </button>
            </div>
            <div className="modal-body">
              <form role="form">
                <input className="form-control" type="checkbox" />
                <input className="form-control" type="checkbox" />
                {addNewFavList}
                <input className="form-control" type="button" value="submit" />
              </form>
            </div>
          </div>
        </div>
    );
    const videoTitle = this.props.videoData === undefined ? null : (
      <div className='video-title'>
        <h1>{videoData.videoName}</h1>
        {likeIcon}
        {unlikeIcon}
        {favIcon}
        <div className={this.state.favDialogCss} role="dialog">
          {addFavDialog}
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
            {videoTitle}
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

