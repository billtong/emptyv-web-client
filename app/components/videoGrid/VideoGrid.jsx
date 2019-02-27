import React from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { getVideosAction } from '../../actions/GetVideosActions.jsx';
import VideoBlock from './videoBlock.jsx';


class VideoGrid extends React.Component {
  constructor(props) {
    super(props);
    //this.onGetVids = this.onGetVids.bind(this);
    this.state = {
      isLoading: false,
      videoList: undefined,
      error: undefined,
      //浏览的的开始位置是第0条，默认是20个pageSize
      inputJson: { offset: 0 }
    };
  }

  componentDidMount() {
      //输入input
      this.props.getVideosAction(this.state.inputJson);
  }

  render() {
    const loadingIcon = this.props.isLoading ? <BarLoader color={'#000000'} /> : null;
    const errText = (this.props.error === undefined) ?
      null : (<div className="sub-title">
        <div className="badge badge-danger">
          {this.props.error}
        </div>
      </div>);
    const videosBlocks = (this.props.videoList === undefined) ? null : 
    this.props.videoList.map((video) => 
      (<VideoBlock key={video.videoId} videoInfo={video} />)
    );
    //console.log("videoBlocks"+videosBlocks);
    return (
      <div className="video-grid-container">
        <div className="loader" > {loadingIcon} </div>
        <div className="error-text-section">{errText}</div>
        <div className="video-blocks-section">
          {videosBlocks}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ VideoGrid }) => {
  const { isLoading, videoList, error } = VideoGrid;
  return { isLoading, videoList, error };
};

module.exports = connect(
  mapStateToProps, { getVideosAction }
)(VideoGrid);
