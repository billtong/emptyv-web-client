import React from 'react';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
import Fav from '../../accessories/Fav';

class VideoTitle extends React.Component {
  render = () => {
    const likeIcon = this.props.hasLike ? (
      <div className='video-action-action actioned'>
        <MdThumbUp />Good 
      </div>
    ) : (
      <div className='video-action-action' onClick={e => this.props.handleClickAction(e, 'like')}>
      <MdThumbUp />Good 
    </div>
    );
    const unlikeIcon = this.props.hasUnlike ? (
      <div className='video-action-action actioned'>
        <MdThumbDown />
      </div>
    ) : (
      <div className='video-action-action thumb-down-action' onClick={e => this.props.handleClickAction(e, 'unlike')}>
        <MdThumbDown />
      </div>
    );
    const videoTitle = this.props.videoData === undefined ? null : (
      <div className='video-title'>
        <h1>{ this.props.videoData.videoName}</h1>
        {likeIcon}
        {unlikeIcon}
        <Fav 
          hasFav={this.props.hasFav}
          videoId={this.props.videoId}
          handleClickAction={this.props.handleClickAction}
        />
      </div>
    );
    return (
      <React.Fragment>
        {videoTitle}
      </React.Fragment>
    );
  }
};

module.exports = VideoTitle;
