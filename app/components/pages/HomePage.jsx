import React from 'react';
import { connect } from 'react-redux';
import VideoGrid from '../accessories/videoGrid/VideoGrid';
import AdImg from '../../../asset/ad-test.jpg';
import { getVideoListAction } from '../../actions/getVideoListActions';


class Home extends React.Component {
  state = {
    filter: 'date',
    word: undefined,
    currPage: 1,
    sizes: 5,
  };

  componentDidMount() {
    const inputJson = { 
      currPage: this.state.currPage,
      sizes: this.state.sizes,
      filter: this.state.filter,
      word: this.state.word
    };
    this.props.getVideoListAction(inputJson);
  }

  render() {
    return (
      <div className="home-section">
        <div className="ad-banner">
          <a>
            <img src={AdImg} alt="ad-img" />
          </a>
        </div>
        <VideoGrid filter={this.state.filter} word={this.state.word} currPage={this.state.currPage} sizes={this.state.sizes} />
      </div>
    );
  }
}

const mapStateToProps = (state) => (state);

module.exports = connect(
  mapStateToProps, { getVideoListAction }
)(Home);

