import React from 'react';
import VideoGrid from './videoGrid/VideoGrid.jsx';

class Home extends React.Component {
    render() {
        return (
            <div className="main-section">
               <VideoGrid/>
            </div>
        );
    }
}
module.exports = Home;
