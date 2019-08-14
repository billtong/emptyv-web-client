import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";

import XHelmet from "../../../components/accessories/XHelmet.js";
import Text from "../../../components/accessories/Text";
import Selector from "../../../components/accessories/Selector";
import {getRandomVideoList} from "../../../utils/api/video";
import Video from "../../../components/accessories/video";
import banner1 from '../../../assets/images/banner1.png';
import banner1_2 from '../../../assets/images/banner1@2x.png';
import banner1_3 from '../../../assets/images/banner1@3x.png';
import './Home.css';

const options = ["date", "rate", "view"];

class Home extends Component {
    state = {
        sort: "date",
        videoList: [],      //total video entity list
        isLoading: false,
        errMsg: undefined,
    };
    handleOptionClick = (value) => {
        this.setState({sort: value});
        this.getVideosFromAPI(value);
    };
    getVideosFromAPI = (sort) => {
        this.setState({isLoading: true});
        getRandomVideoList().then((res) => {
            this.setState({
                videoList: res.data,
                isLoading: false
            });
        }).catch((err) => {
            this.setState({errMsg: "Sorry...we ain\\'t able to serve any videos rn", isLoading: false});
        });
    };

    componentDidMount() {
        this.getVideosFromAPI(this.state.sort);
    }

    render() {
        const selectorTitle = (
            <Text id={"se_title"}/>
        );
        return (
            <Fragment>
                <XHelmet title={"Empty Video"}/>
                <img src={banner1}
                     srcSet={`${banner1_2}, ${banner1_3}`}
                     className="banner-image"/>
                <div className={"selector-container"}>
                    <Selector
                        title={selectorTitle}
                        options={options}
                        selectedOptions={this.state.sort}
                        passFatherState={this.handleOptionClick}
                    />
                </div>
                <Video
                    videoList={this.state.videoList}
                    isLoading={this.state.isLoading}
                    errMsg={this.state.errMsg}
                />
            </Fragment>
        )
    }
}

export default withRouter(Home)
