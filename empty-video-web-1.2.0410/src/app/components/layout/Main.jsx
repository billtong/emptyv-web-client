import React from 'react';
import Header from './Header';
import Footer from './Footer';

class Main extends React.Component {
  render() {
    return (
      <div className="main-section">
        <Header />
        <div className="main-bodey-container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
export default Main;
