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
      currPage: 1,
      totalPages: undefined,
      sizes: 20
    };
  }

  componentDidMount() {
      //输入input
      console.log('did mount videoGrid');
      const inputJson = { 
        currPage: this.state.currPage,
        sizes: this.state.sizes,
        filter: this.props.filter,
        word: this.props.word
      };
      this.props.getVideosAction(inputJson);
  }

  render() {
    const loadingIcon = this.props.isLoading ? <BarLoader color={'#fff'} /> : null;
    const errText = (this.props.error === undefined) ?
      null : (
        <div className="badge badge-danger">
          {this.props.error}
        </div>
      );
    
      const videosBlocks = (this.props.videoList === undefined) ? null : 
      this.props.videoList.map((video) => 
        (<VideoBlock key={video.videoId} videoInfo={video} />)
      );
    
    const pagination = (this.props.totalPages === undefined) ? null : 
      Array.apply(null, { length: this.props.totalPages }).map((value, index) => {
        const changePage = (e) => {
          e.preventDefault();
          this.setState(prevState => ({
            ...prevState,
            videoList: undefined,
            currPage: (index + 1)
          }));
          const inputJson = { currPage: (index + 1) };
          this.props.getVideosAction(inputJson);
          document.documentElement.scrollTop = 0;  //back to top
        };
        return ((index + 1) === this.state.currPage) ? (
            <div key={index} className="index-text currPage-index-text">[{index + 1}]</div> 
          ) : ( 
            <div key={index} className="index-text" onClick={changePage}>{index + 1}</div> 
          );
      });
    return (
      <div className="video-grid-container">
        <div className="video-blocks-section">{videosBlocks}</div>
        <div className="pagination">{pagination}</div>
        <div className="loader" >{loadingIcon}</div>
        <div className="error-text-section">{errText}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ videoGrid }) => {
  const { isLoading, videoList, error, totalPages } = videoGrid;
  return { isLoading, videoList, error, totalPages };
};

module.exports = connect(
  mapStateToProps, { getVideosAction }
)(VideoGrid);
