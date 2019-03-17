import React from 'react';


class AboutPage extends React.Component {
  render() {
    return (
      <div className="about-us-page">
        <div className="about-us-container">
          <h1 className="title-text">Empty Video v1.0.0</h1>
          <section>
            <h2>Accounts Privileges</h2>
            <ul>
              <li>comment to a video</li>
              <li>like/unlike a video</li>
              <li>add video to your <p>fav list</p></li>
              <li>record your history</li>
            </ul>
          </section>
          <section>
            <h2>New Features Upcomming <p>(´• ω •`)ﾉ</p></h2>
            <ul>
              <li>share your own videos</li>
              <li><p>DanMu</p> comment on the video</li>
              <li>favourite list</li>
            </ul>
          </section>
          <section>
            <span>
              <h2>Join Us</h2>
              <li>Language: JavaScript, H5, <p>CSS</p>, <p>Python</p>, Java</li>
              <li>Framworks: <p>React.JS</p>, Spring, SpringMVC, Mybatis</li>
              <li>Email: <p>emptyvideos@outlook.com</p></li>
              <li>QQ: <p>2723230945</p></li>
              <li>FollowMe: <p><a href="https://github.com/billtong">GitHub Account</a></p></li>
            </span>
          </section>
          <div className="foot-text">
          <div>we create a free WORLD</div>
          <div> — emptyvideo team</div>
          </div>
        </div>
      </div>
    );
  }
} 

module.exports = AboutPage;
