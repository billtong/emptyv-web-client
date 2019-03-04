import React from 'react';
import VideoGrid from './videoGrid/VideoGrid.jsx';

import AdImg from '../../asset/ad-test.jpg';


class Home extends React.Component {
  render() {
    return (
      <div className="home-section">
        <div className="ad-banner">
          <a>
            <img src={AdImg} alt="ad-img" />
          </a>
        </div>
        <VideoGrid />
      </div>
    );
  }
}
module.exports = Home;
