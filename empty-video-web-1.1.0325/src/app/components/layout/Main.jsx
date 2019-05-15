import React from 'react';
import Header from './Header';


class Main extends React.Component {
  render() {
    return (
      <div className="main-section">
        <Header />
        <div className="main-bodey-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default Main;
