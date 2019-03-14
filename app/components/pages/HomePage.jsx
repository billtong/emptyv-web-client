import React from 'react';
import { connect } from 'react-redux';
import VideoGrid from '../accessories/videoGrid/VideoGrid';
import AdImg from '../../../asset/ad-test.jpg';
import { getVideoListAction } from '../../actions/getVideoListActions';
import Pagination from '../accessories/Pagination'; 

class Home extends React.Component {
  state={
    filter: 'date'
  }
  componentDidMount() {
    this.props.getVideoListAction({ 
      filter: this.state.filter,
      word: undefined
    });
  }

  handleChange=(e) => {
    e.preventDefault();
    this.setState({
      filter: this.refs.filter.value
    });
    this.props.getVideoListAction({
      filter: this.refs.filter.value,
      word: this.props.word
    });
  }

  render() {
    const searchKeywordText = (!this.props.word) ? null : (
      <div className="search-keyword-display">Search Result for: {this.props.word}</div>
    );

    const pagination = (!this.props.videoList) ? null : (
      <Pagination 
        list={this.props.videoList}
        tag="video"
      />
    );
    return (
      <div className="home-section">
        <div className="ad-banner">
          <a>
            <img src={AdImg} alt="ad-img" />
          </a>
        </div>
        {searchKeywordText}
        <div className="filter-selecter-section">
          Sort By&nbsp;&nbsp;
          <select 
            className="select-section" 
            value={this.state.filter} 
            onChange={e => this.handleChange(e)}
            ref="filter"
          >
            <option value="date">Upload date</option>
            <option value="rate">Rating</option>
            <option value="view">View count</option>
          </select>
        </div>
        <VideoGrid filter={this.state.filter} />
        {pagination}
      </div>
    );
  }
}

const mapStateToProps = ({ videoGrid }) => {
  const { word, videoList } = videoGrid;
  return { word, videoList };
};

module.exports = connect(
  mapStateToProps, { getVideoListAction }
)(Home);
