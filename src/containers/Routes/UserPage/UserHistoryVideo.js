import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import {TitleText, VideoWrapper} from "./UserUploadVideo";
import {EmptyTitle, LittleTitle, LittleTitleSelected} from "./UserFavVideo";
import {getUserHistory} from "../../../utils/api/user";
import Video from "../../../components/accessories/video";
import operation from "../../../assets/operations";
import {getVideoByIds} from "../../../utils/api/video";

class UserHistoryVideo extends Component {
    state = {
        history: [],
        operation: "",
        videoList: [],
        isLoading: false,
        errMsg: null,
    };

    componentDidMount = () => {
        this.setState({
            isLoading: true,
        });
        getUserHistory().then(res => {
            const historyList = res.data.filter(item => item.operation === operation.LIKE_A_VIDEO || item.operation === operation.UNLIKE_A_VIDEO || item.operation === operation.VIEW_A_VIDEO);
            const ids = [...new Set(historyList.map(item => item.object.id))].join(",");
            getVideoByIds({
                ids: ids,
            }).then(res => {
                const videoList = res.data;
                historyList.forEach(value => {
                    value.object = videoList.find(video => video.id === value.object.id);
                });
                console.log(historyList);
                this.setState({
                    history: historyList,
                    isLoading: false,
                });
            });
        }).catch((err) => {
            this.setState({
                isLoading: false,
                errMsg: err.message,
            });
        });
    };

    generateHistoryVideoList = (rawVideoList, operation) => {
        let list = rawVideoList.map((value) => {
            if (value.operation === operation) {
                return value.object;
            }
        });
        list = list.filter(video => video != null);
        /*
        for (let index = list.length - 1; index >= 0; index--) {
            if (index >= 1 && list[index - 1].videoId === list[index].videoId) {
                list.splice(index, 1);
            }
        }
         */
        this.setState({videoList: list});
    };

    render = () => {
        const histMenuArr = ['view', 'like', 'unlike'];
        const histMenuOpt = [operation.VIEW_A_VIDEO, operation.LIKE_A_VIDEO, operation.UNLIKE_A_VIDEO];
        const historyMenuList = this.state.history && this.state.history.length > 0 ? histMenuArr.map((value, index) => {
            if (this.state.operation === histMenuOpt[index]) {
                return (
                    <LittleTitleSelected key={index}>{value}</LittleTitleSelected>
                );
            }
            const handleHistoryMenuClick = (e, newAction) => {
                e.preventDefault();
                this.setState({
                    operation: newAction,
                });
                this.generateHistoryVideoList(this.state.history, newAction);
            };
            return (
                <LittleTitle key={index}
                             onClick={e => handleHistoryMenuClick(e, histMenuOpt[index])}>{value}</LittleTitle>
            );
        }) : (<EmptyTitle>It is empty here</EmptyTitle>);
        return (
            <Fragment>
                <VideoWrapper>
                    <TitleText>History</TitleText>
                    {historyMenuList}
                    <Video
                        videoList={this.state.videoList}
                        isLoading={this.state.isLoading}
                        errMsg={this.state.errMsg}
                        pageSize={3}
                    />
                </VideoWrapper>
            </Fragment>
        );
    }
}

export default UserHistoryVideo;

UserHistoryVideo.propsTypes = {
    userId: PropTypes.number,
};

UserHistoryVideo.defaultProps = {
    userId: null,
};
