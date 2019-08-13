import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import Text from '../../../components/accessories/Text';
import "./AboutPage.css";
import XHelmet from "../../../components/accessories/XHelmet";
import Comment from "../../../components/accessories/comment/Comment";

const aboutId = "about-us";

class AboutPage extends Component {
    render = () => {
        return (
            <div className="about-us-page">
                <XHelmet title={"About Us"}/>
                <div className="about-us-container">
                    <h1 className="title-text">Empty Video</h1>
                    <h4 className="title-text">1.3.0901</h4>
                    <section>
                        <h2><Text id="abs1"/></h2>
                        <ul>
                            <li><Text id="abl1_1"/></li>
                            <li><Text id="abl1_2"/></li>
                            <li><Text id="abl1_3"/></li>
                            <li><Text id="abl1_4"/></li>
                        </ul>
                    </section>
                    <section>
                        <h2><Text id="abs2"/></h2>
                        <ul>
                            <li><Text id="abl2_1"/></li>
                            <li><Text id="abl2_2"/></li>
                            <li><Text id="abl2_3"/></li>
                            <li><Text id="abl2_4"/></li>
                        </ul>
                    </section>
                    <section>
            <span>
              <h2><Text id="abs3"/></h2>
              <li><Text id="abl3_1"/>Java, Golang, ES6, H5, CSS</li>
              <li><Text id="abl3_2"/>React, Spring Boot, Spring Cloud</li>
              <li><Text id="abl3_3"/>Docker, Jenkins</li>
              <li><Text id="abl3_5"/><p><a href="https://github.com/agateram" target="_blank">GitHub</a></p></li>
            </span>
                    </section>
                    <div className="foot-text">
                        <div><Text id="abf"/></div>
                        <div> — Empty Video Team</div>
                    </div>
                </div>
                <Comment videoId={aboutId}/>
            </div>
        );
    }
}

export default withRouter(AboutPage);
