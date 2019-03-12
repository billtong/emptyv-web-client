import React from 'react';
import { connect } from 'react-redux';
import { BarLoader } from 'react-spinners';
import { getVideoListAction } from '../../../actions/getVideoListActions';
import VideoBlock from './VideoBlock';
import Pagination from '../Pagination';


class VideoGrid extends React.Component {
  state = {
    isLoading: false,
    videoList: undefined,
    error: undefined,
    currPage: this.props.currPage,  //这里的currPage初始为1，paginate回自动生成相应的pageNum
    totalPages: undefined
  };

  componentWillUnmount() {
    document.getElementsByClassName('search-input')[0].value = '';
  }

  handleChange=(e) => {
    e.preventDefault();
    const inputJson = {
      currPage: this.state.currPage,
      sizes: this.props.sizes,
      filter: e.target.value,
      word: this.props.word
    };
    this.props.getVideoListAction(inputJson);
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
        <Pagination 
          list={this.props.videoList}
          totalPages={this.props.totalPages}
          word={this.props.word}
          filter={this.props.filter}
          sizes={this.props.sizes}
        />
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
  mapStateToProps, { getVideoListAction }
)(VideoGrid);
