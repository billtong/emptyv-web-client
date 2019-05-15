import React from 'react';
import Header from './Header';


class Main extends React.Component {
  render() {
    return (
      <div className="main-section">
        <Header />
        {this.props.children}
      </div>
    );
  }
}
module.exports = Main;
