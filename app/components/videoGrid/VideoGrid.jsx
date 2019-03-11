import React from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
import getVideosAction from '../../actions/GetVideosActions';
import VideoBlock from './VideoBlock';


class VideoGrid extends React.Component {
  state = {
    isLoading: false,
    videoList: undefined,
    error: undefined,
    currPage: this.props.currPage,  //这里的currPage初始为1，paginate回自动生成相应的pageNum
    totalPages: undefined
  };

  componentWillUnmount() {
    const searchInputElement = document.getElementsByClassName('search-input')[0];
    searchInputElement.value = '';
  }

  handleChange=(e) => {
    e.preventDefault();
    const inputJson = {
      currPage: this.state.currPage,
      sizes: this.props.sizes,
      filter: e.target.value,
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

    const searchKeywordText = (this.props.word === undefined) ? null : (
      <div className="search-keyword-display">Search Result for: {this.props.word}</div>
    );

    const pagination = (this.props.videoList === undefined || this.props.totalPages === undefined) ? null : 
      Array.apply(null, { length: this.props.totalPages }).map((value, index) => {
        const changePage = (e) => {
          e.preventDefault();
          this.setState(prevState => ({
            ...prevState,
            videoList: undefined,
            currPage: (index + 1)
          }));
          const inputJson = { 
            currPage: (index + 1),
            sizes: this.props.sizes,
            filter: this.props.filter,
            word: this.props.word
          };
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
        {searchKeywordText}
        <div className="filter-selecter-section">
          Sort By&nbsp;&nbsp;
          <select className="select-section" value={this.props.filter} onChange={e => this.handleChange(e)}>
            <option value="date">Upload date</option>
            <option value="rate">Rating</option>
            <option value="view">View count</option>
          </select>
        </div>
        <div className="video-blocks-section">{videosBlocks}</div>
        <div className="pagination">{pagination}</div>
        <div className="loader" >{loadingIcon}</div>
        <div className="error-text-section">{errText}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ videoGrid }) => {
  const { isLoading, videoList, error, totalPages, word, filter } = videoGrid;
  return { isLoading, videoList, error, totalPages, word, filter };
};

module.exports = connect(
  mapStateToProps, { getVideosAction }
)(VideoGrid);
