import React from 'react';
import { IoIosArrowUp} from 'react-icons/io';

class Footer extends React.Component {
  state = {
    isTop: true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  handleScroll=(e) => {
    if(window.scrollY === 0) {
      this.setState({ isTop: true });
    }
    if(window.scrollY !== 0) {
      this.setState({ isTop: false });
    }
  }

  render() {
    const upArrow = this.state.isTop ? null : (
      <span className="up-arrow" onClick={(e)=>{
        e.preventDefault();
        const timer = setInterval(() => {
          window.scrollBy(0, -30);
          if(window.scrollY===0) {
            this.setState({isTop: true});
            clearInterval(timer);
          }
        }, 10);
      }}>
        <IoIosArrowUp color="#d9d9d9"/>
      </span>
    ); 

    return (
      <div className="footer-section">
        {upArrow}
      </div>
    );
  }
}

export default Footer;