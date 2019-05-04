import React from 'react';
import { connect } from 'react-redux';
import VideoGrid from '../accessories/videoGrid/VideoGrid';
import AdImg from '../../../asset/ad-test.jpg';
import { getVideoListAction } from '../../actions/getVideoListActions';
import Pagination from '../accessories/Pagination';
import Filter from '../accessories/Filter';

class Home extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    this.props.getVideoListAction({
      filter: 'date'
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
        <Filter />
        <VideoGrid />
        {pagination}
      </div>
    );
  }
}

const mapStateToProps = ({ getVideoListReducer }) => {
  const { word, videoList } = getVideoListReducer;
  return { word, videoList };
};

export default connect(
  mapStateToProps, { getVideoListAction }
)(Home);
