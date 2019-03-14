import React from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
import VideoBlock from './VideoBlock';

class VideoGrid extends React.Component {
  render() {
    const loadingIcon = this.props.isLoading ? <BarLoader color={'#fff'} /> : null;
    const errText = (this.props.error === undefined) ?
      null : (
        <div className="badge badge-danger">
          {this.props.error}
        </div>
      );
    const videosBlocks = (!this.props.videoList || !this.props.currPage || !this.props.sizes) ? null : 
    this.props.videoList.map((video, index) => {
      const { currPage, sizes } = this.props;
      if (index >= (currPage - 1) * sizes && index < currPage * sizes) {
        return (<VideoBlock key={video.videoId} videoInfo={video} />);
      }
    });
    return (
      <div className="video-grid-container">
        <div className="video-blocks-section">{videosBlocks}</div>
        <div className="loader" >{loadingIcon}</div>
        <div className="error-text-section">{errText}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ videoGrid }) => {
  const { isLoading, videoList, error, currPage, sizes } = videoGrid;
  return { isLoading, videoList, error, currPage, sizes };
};

module.exports = connect(
  mapStateToProps, {}
)(VideoGrid);
