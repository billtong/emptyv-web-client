import React from 'react';
import Header from './header/Header.jsx';


class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <hr />
        <div className="main-section">
          {this.props.children}
        </div>
      </div>
    );
  }
}
module.exports = Main;
