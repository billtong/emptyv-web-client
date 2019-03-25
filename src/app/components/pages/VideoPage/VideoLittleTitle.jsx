import React from 'react';
import { IoIosHeart } from 'react-icons/io';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import Tag from '../../accessories/Tag';
import { formatDateTime } from '../../../utils/dateTools';


class VideoLittelTitle extends React.Component {
  render = () => {
    const tagList = this.props.videoData === undefined ? null : (
      <Tag tagList={this.props.videoData.videoTag} videoId={this.props.videoData.videoId} />
    );
    const videoLittleTitle = this.props.videoData === undefined ? null : (
      <div className='video-little-title-sectiton'>
        <div className='video-view-num'>
          {this.props.videoData.videoViewNum} views
        </div>
        <div className='num video-like-num'>
          {this.props.videoData.videoLikeNum}<MdThumbUp />
        </div>
        <div className='num video-unlike-num'>
          {this.props.videoData.videoUnlikeNum}<MdThumbDown />
        </div>
        <div className='num video-fav-num'>
          {this.props.videoData.videoFavouriteNum}<IoIosHeart />
        </div>
        <div className='video-upload-data'>
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
