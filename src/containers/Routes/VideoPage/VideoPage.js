import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import XHelmet from "../../../components/accessories/XHelmet";
import {getVideo} from "../../../utils/api/video";
import {getSessionTokenJson} from "../../../utils/api/apiHelper";
import {getUserHistory} from "../../../utils/api/user";
import VideoPlayer from "../../../components/accessories/emptyplayer/VideoPlayer";
import styled from "styled-components";
import Comment from "../../../components/accessories/comment/Comment";
import VideoPageInfo from "./VideoPageInfo";
import {getFavListsByUser} from "../../../utils/api/fav";
import history from "../../../utils/history";

const VideoWrapper = styled.div`
	position: relative;
	width: 880px;
	height: 570px;
	margin: 30px 5rem 0px 5rem;
	@media screen and (max-width: 450px) {
		 margin: 0;
		 width: 100%;
		 height: auto;
	}
`;

const VideoInfoWrapper = styled.div`
	border: 1px solid #313131;
	border-radius: 4px;
	width: 880px;
	text-align: left;
	margin: 0px 5rem 0px 5rem;
	@media screen and (max-width: 450px) {
		 width: 100%;
		 margin: 0;
	}
`;

const CommentWrapper = styled.div`
	text-align: left;
`;

class VideoPage extends Component {

    state = {
        video: undefined,
        favLists: undefined,
        history: undefined,
        isLoading: false,
    };

    componentDidMount = () => {
        const videoId = this.props.match.params.id;
        this.setState({
            isLoading: true,
        });
        getVideo({
            videoId: videoId
        }).then((videoRes) => {
            if (!videoRes.data) {
                history.push("/404");
            }
            if (getSessionTokenJson() !== null) {
                getUserHistory().then(historyRes => {
                    this.setState({
                        history: historyRes.data,
                    });
                    getFavListsByUser({
                        userId: getSessionTokenJson().user.id,
                    }).then(favListRes => {
                        this.setState({
                            favLists: favListRes.data,
                            video: videoRes.data,
                            isLoading: false,
                        });
                    })
                });
            } else {
                this.setState({
                    video: videoRes.data
                });
            }
        }).catch(historyErr => {
            console.log(historyErr.message);
        }).finally(() => {
            this.setState({
                isLoading: false,
            });
        });
    };

    render = () => {
        const videoId = this.props.match.params.id;
        const {video, isLoading, history, favLists} = this.state;
        const loading = isLoading ? (<div>
            loading...
        </div>) : null;
        return (
            <Fragment>
                <XHelmet title={`you are watching video@${videoId}`}/>
                {loading}
                <VideoWrapper>
                    <VideoPlayer
                        className='react-player'
                        video={video}
                    />
                </VideoWrapper>
                <VideoInfoWrapper>
                    <VideoPageInfo
                        videoData={video}
                        videoId={videoId}
                        history={history}
                        favLists={favLists}
                    />
                </VideoInfoWrapper>
                <CommentWrapper>
                    <Comment videoId={videoId}/>
                </CommentWrapper>
            </Fragment>
        );
    }
}

export default withRouter(VideoPage);
