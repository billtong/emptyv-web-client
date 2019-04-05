import React from 'react';
import { IoIosArrowUp} from 'react-icons/io';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer-section">
        <span className="up-arrow">
          <IoIosArrowUp color="#d9d9d9"/>
        </span>
      </div>
    );
  }
}

export default Footer;