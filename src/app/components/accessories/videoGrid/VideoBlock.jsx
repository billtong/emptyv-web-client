import React from 'react';
import { hashHistory } from 'react-router';

class VideoBlock extends React.Component {
  constructor(props) {
    super(props);
    this.clickVideo = this.clickVideo.bind(this);
  }

  clickVideo = (e) => {
    e.preventDefault();
    const videoId = this.props.videoInfo.videoId;
    hashHistory.push(`VideoPage?videoId=${videoId}`);
  }

  render() {
    return (
      <div className="video-block-section" onClick={this.clickVideo}>
        <div className="video-thumbnail-img-section">
            <img width="200" height="150" src={this.props.videoInfo.videoThumbnailImg} />
        </div>
        <div className="video-title-section">
            {this.props.videoInfo.videoName}
        </div>
        <div className="video-view-num-section">
            {this.props.videoInfo.videoViewNum} views
        </div>
      </div>
    );
  }
}
export default VideoBlock;
