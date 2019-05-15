import React from 'react';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import { connect } from 'react-redux';
import { IoIosHeart } from 'react-icons/io';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router';

import ReactPlayer from '../accessories/VideoPlayer';
import Pagination from '../accessories/Pagination';
import CommentGrid from '../accessories/comment/CommentGrid';
import Tag from '../accessories/Tag';
import { formatDateTime } from '../../utils/dateTools.jsx';
import { getVideoActions } from '../../actions/getVideoActions.jsx';
import { getCommentListAction, completeGetComment } from '../../actions/getCommentListAction';
import { getSessionTokenJson } from '../../api/apiHelper';
import { patchOtherNum } from '../../api/video.jsx';
import { postComment } from '../../api/comment';

class VideoPage extends React.Component {
  state= {
    hasLike: false,
    hasUnlike: false,
    hasFav: false,
    isBlur: true,
    isForcus: false
  }
    
  componentWillMount() {
    document.addEventListener('keypress', this.handleEnterKey);
  }

  componentDidMount() {
    this.props.getCommentListAction({ videoId: this.props.location.query.videoId });
    this.props.getVideoActions(this.props.location.query.videoId);
    document.removeEventListener('keypress', this.handleEenterKey);
  }

  //将comment回复成undefined状态
  componentWillUnmount() {
    this.props.completeGetComment();
  }

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
            hasFav: true
          }));
          break;
        default:
      }
    }).catch(() => {
      alert('failed, pleas login or sign up');
    });
  }

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
 
  ifForcus=() => {
    this.setState(prevState => ({
      ...prevState,
      isForcus: true,
      isBlur: false
    }));
  }

  ifBlur=() => {
    this.setState(prevState => ({
      ...prevState,
      isForcus: false,
      isBlur: true
    }));
  }

  render() {
    const videoData = this.props.videoData;
    const loadingIcon = this.props.isLoading ? (
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
        <IoIosHeart />
      </div>
    ) : (
      <div className='video-action-action love-action' onClick={e => this.handleClickAction(e, 'favourite')}>
        <IoIosHeart />
      </div>
    );
    const videoTitle = this.props.videoData === undefined ? null : (
      <div className='video-title'>
        <h1>{videoData.videoName}</h1>
        {likeIcon}
        {unlikeIcon}
        {favIcon}
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
          Published on {formatDateTime(parseInt(videoData.videoDate))}
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
            onFocus={this.ifForcus}
            onBlur={this.ifBlur}
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

const mapStateToProps = ({ getVideoReducer, getCommentListReducer }) => {
  const { videoData, isLoading, error } = getVideoReducer;
  const commentList = getCommentListReducer.commentList;
  return { videoData, isLoading, error, commentList };
};

module.exports = connect(
  mapStateToProps, { getVideoActions, getCommentListAction, completeGetComment }
)(VideoPage);

