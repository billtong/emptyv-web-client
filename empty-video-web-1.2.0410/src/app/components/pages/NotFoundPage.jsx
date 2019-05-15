import React from 'react';

import unknowImgURL from '../../../asset/404.jpg';

class NotFoundPage extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <div className="unknow-section">
        <span className="unknow-text">
         THIS IS AN UNKNOWN PLACE
        </span>
        <img className="unknow-img" src={unknowImgURL} />
      </div>
    );
  }
}

export default NotFoundPage;


