import React from 'react';
import { hashHistory } from 'react-router';
import { getVideo } from '../../api/getVideo.jsx';


class VideoBlock extends React.Component {
  constructor(props) {
    super(props);
    this.clickVideo = this.clickVideo.bind(this);
  }

  clickVideo = (e) => {
    e.preventDefault();
    const data = this.props.videoInfo;
    const path = {
      pathname: '/VideoPage',
      query: data
    };
    getVideo(this.props.videoInfo.videoId);
    hashHistory.push(path);
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
module.exports = VideoBlock;
