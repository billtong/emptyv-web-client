import React from 'react';
import { connect } from 'react-redux';
import { } from 'react-router';
import VideoGrid from './videoGrid/VideoGrid.jsx';
import AdImg from '../../asset/ad-test.jpg';
import getVideosAction from '../actions/GetVideosActions';


class Home extends React.Component {
  state = {
    filter: 'date',
    word: undefined,
    currPage: 1,
    sizes: 1,
  };

  componentDidMount() {
    const inputJson = { 
      currPage: this.state.currPage,
      sizes: this.state.sizes,
      filter: this.state.filter,
      word: this.state.word
    };
    this.props.getVideosAction(inputJson);
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

const mapStateToProps = () => {};

module.exports = connect(
  mapStateToProps, { getVideosAction }
)(Home);

