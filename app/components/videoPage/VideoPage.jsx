import React from 'react';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import { connect } from 'react-redux';
import { IoIosHeart } from 'react-icons/io';
import { RingLoader } from 'react-spinners';

import ReactPlayer from './VideoPlayer.jsx';
import CommentGrid from '../comment/CommentGrid.jsx';
import { formatDateTime } from '../../utils/dateTools.jsx';
import { getVideoActions } from '../../actions/getVideoActions.jsx';
import videoAPI from '../../api/video.jsx';


class VideoPage extends React.Component {
  state= {
    hasLike: false,
    hasUnlike: false,
    hasFav: false,
  }
    
  componentDidMount() {
    this.props.getVideoActions(this.props.location.query.videoId);
  }

  handleClickAction = (e, myAction) => {
    e.preventDefault();
    const userJSON = JSON.parse(sessionStorage.getItem('empty-video-web-user-session'));
    if (!userJSON) {
      alert('please login or sign up a new account');
      return;
    }

    const inputJson = {
      action: myAction,
      videoId: this.props.videoData.videoId,
      userId: userJSON.user.userId,
      token: userJSON.userToken,
      sessionId: userJSON.userSessionId
    };

    videoAPI.patchOtherNum(inputJson).then(() => {
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
      console.log(this.state);
    }).catch(() => {
      alert('failed, pleas login or sign up');
    });
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
          video_url: videoData.videoSrc
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
    const videoLittleTitle = this.props.videoData === undefined ? null : (
      <div className='video-little-title-sectiton'>
        <div className='video-view-num'>
          {videoData.videoViewNum} views
        </div>
        <div className='video-like-num'>
          {videoData.videoLikeNum}<MdThumbUp />
        </div>
        <div className='video-unlike-num'>
          {videoData.videoUnlikeNum}<MdThumbDown />
        </div>
        <div className='video-fav-num'>
          {videoData.videoFavouriteNum}<IoIosHeart />
        </div>
        <div className='video-upload-data'>
          Published on {formatDateTime(parseInt(videoData.videoDate))}
        </div>
      </div>
    );
    const videoComment = this.props.videoData === undefined ? null : (
      <CommentGrid videoId={videoData.videoId} />
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
        {videoComment}
      </div>
    );
  }
}

const mapStateToProps = ({ videoPage }) => {
  const { videoData, isLoading, error } = videoPage;
  return { videoData, isLoading, error };
};

module.exports = connect(
  mapStateToProps, { getVideoActions }
)(VideoPage);

