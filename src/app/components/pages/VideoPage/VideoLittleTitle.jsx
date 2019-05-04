import React from 'react';
import { IoIosHeart } from 'react-icons/io';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import Tag from '../../accessories/Tag';
import UserAvatar from '../../accessories/UserAvatar';
import { formatDateTime } from '../../../utils/dateTools';


class VideoLittelTitle extends React.Component {
  render = () => {
    const tagList = this.props.videoData === undefined ? null : (
      <Tag tagList={this.props.videoData.videoTag} videoId={this.props.videoData.videoId} />
    );
    let likeRate = 100;
    let likeRateDiv = null;
    if(this.props.videoData !== undefined) {
      const videoLikeNum = parseInt(this.props.videoData.videoLikeNum, 10);
      const videoUnlikeNum = parseInt(this.props.videoData.videoUnlikeNum, 10);
      if(videoLikeNum === videoLikeNum + videoUnlikeNum) {
        likeRate = 100;
      } else if(videoUnlikeNum === videoLikeNum+videoUnlikeNum) {
        likeRate = 0;
      } else {
        likeRate = (videoLikeNum / (videoLikeNum+videoUnlikeNum)).toFixed(2).slice(-2);
      }
      likeRateDiv = likeRate >= 50 ? (
        <div className='num video-like-num'>
          {likeRate}% <MdThumbUp color="#5faa01" />
        </div>
      ) : (
        <div className='num video-unlike-num'>
          {likeRate}% <MdThumbDown color="#c71d1d" />
        </div>
      );
    }
    
    const videoLittleTitle = this.props.videoData === undefined ? null : (
      <div className='video-little-title-sectiton'>
        <div className='video-upload-user'>
          <UserAvatar userInfo={this.props.videoData.userInfo}/>
        </div>
        <div className='num video-view-num'>
          {this.props.videoData.videoViewNum} views
        </div>
        {likeRateDiv}
        <div className='num video-fav-num'>
          {this.props.videoData.videoFavouriteNum}<IoIosHeart />
        </div>
        <div className='video-upload-date'>
          Published on {formatDateTime(parseInt(this.props.videoData.videoDate, 0))}
        </div>
        {tagList}
      </div>
    );
    return (
      <React.Fragment>
        {videoLittleTitle}
      </React.Fragment>
    );
  }
};

export default VideoLittelTitle;
