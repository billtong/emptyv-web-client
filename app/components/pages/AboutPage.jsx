import React from 'react';


class AboutPage extends React.Component {
  render() {
    return (
      <div className="about-us-page">
        <div className="about-us-container">
          <h1 className="title-text">Empty Video</h1>
          <h4 className="title-text">1.1.0325</h4>
          <section>
            <h2>Accounts Privileges</h2>
            <ul>
              <li>comment to a video</li>
              <li>like/unlike a video</li>
              <li>add video to your <p>favourite list</p></li>
              <li>record your history</li>
              <li>try <p>danmu</p> BETA</li>
            </ul>
          </section>
          <section>
            <h2>New Features Comming</h2>
            <ul>
              <li>share your own videos</li>
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
          <div>we create a free WRLD</div>
          <div> — emptyvideo team</div>
          </div>
        </div>
      </div>
    );
  }
} 

module.exports = AboutPage;
