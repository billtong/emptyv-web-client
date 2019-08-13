import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {getFavListsByUser} from "../../../utils/api/fav";
import {TitleText, VideoWrapper} from "./UserUploadVideo";
import Video from "../../../components/accessories/video";
import {getVideoByIds} from "../../../utils/api/video";

const FavFlexWrapper = styled.div`
	display: flex;
	justify-content: start;
`;

const FavDetailsWrapper = styled.div`
	margin: 1.5rem 2rem;
`;

const FavListDetails = styled.div`
	display: inline;
	margin-right: 1rem;
`;

export const EmptyTitle = styled.div`
	font-size: 1rem;
	font-style: italic;
	display: inline;
	margin-left: 1rem;
`;

export const LittleTitleSelected = styled.div`
	font-size: 1rem;
	color: orange;
	display: inline;
	margin-left: 1rem;
	cursor: pointer;
`;

export const LittleTitle = styled.div`
	font-size: 1rem;
	display: inline;
	margin-left: 1rem;
	cursor: pointer;
`;

class UserFavVideo extends Component {
    state = {
        favListSelectedId: 0,
        favListSelected: {},
        userFavLists: [],
        videoList: [],
        isLoading: false,
        errMsg: null,
    };
    componentDidMount = () => {
        this.setState({
            isLoading: true,
        });
        getFavListsByUser({
            userId: this.props.userId
        }).then(res1 => {
            const userFavLists = res1.data;
            let videoIds = [];
            userFavLists.forEach(value => {
                videoIds = videoIds.concat(value.videoIds);
            });
            const videoIdsString = [...new Set(videoIds)].join(",");
            getVideoByIds({
                ids: videoIdsString
            }).then(res2 => {
                userFavLists.forEach(value => {
                    value.videoList = value.videoIds.map(value => {
                        return res2.data.filter(video => video.id === value)[0];
                    });
                });
                this.setState({
                    userFavLists: userFavLists,
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

    render = () => {
        const favMenuList = (!this.state.userFavLists || this.state.userFavLists.length === 0) ? (
            <EmptyTitle>empty</EmptyTitle>
        ) : this.state.userFavLists.map((value, index) => {
            if (this.state.favListSelectedId === value.id) {
                return (
                    <LittleTitleSelected key={index}>{value.name}</LittleTitleSelected>
                );
            }
            const handleFavMenuClick = (e, favId) => {
                e.preventDefault();
                this.setState({
                    favListSelectedId: value.id,
                    favListSelected: value,
                    videoList: value.videoList,
                });
            };
            return (
                <LittleTitle key={index} ref={index} onClick={(e) => handleFavMenuClick(e, value.id)}>
                    {value.name}
                </LittleTitle>
            );
        });

        const favListInfo = (this.state.favListSelected && this.state.favListSelected.videoList) && (
            <FavDetailsWrapper>
                <FavListDetails>
                    {this.state.favListSelected.videoList.length} videos
                </FavListDetails>
                <FavListDetails>
                    Published on {this.state.favListSelected.created}
                </FavListDetails>
                <FavListDetails>
                    Updated on {this.state.favListSelected.updated}
                </FavListDetails>
            </FavDetailsWrapper>
        );

        return (
            <Fragment>
                <VideoWrapper>
                    <FavFlexWrapper>
                        <div>
                            <TitleText>Favourite List</TitleText>
                            {favMenuList}
                        </div>
                        {favListInfo}
                    </FavFlexWrapper>
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

export default UserFavVideo;

UserFavVideo.propsTypes = {
    userId: PropTypes.number,
};

UserFavVideo.defaultProps = {
    userId: null,
};
