import React, {Component, Fragment} from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import {MdAdd} from 'react-icons/md';
import {getSessionTokenJson} from "../../../utils/api/apiHelper";
import {patchVideoTag} from "../../../utils/api/video";
import history from "../../../utils/history";
import Text from '../../../components/accessories/Text';

const Wrapper = styled.div`
  padding: 0.5rem 1rem;
	border-top: 1px solid #313131;
`;

const TagWrapper = styled.div`
	display: inline-block;
	padding-right: .5rem;
	border: 0.15rem solid #d9d9d9;
	border-radius: 1rem;
	padding: 0 1rem;
	margin: 0 10px 8px 0;
	font-weight: 500;
`;

class VideoTag extends Component {
    state = {
        tagList: [],  //用于记录改变的tagList
        isTagAdd: false,              //用于记录btn和input的状态改变
        isTagBlur: true,              //blur和focus是防止被其他input的enter提交给影响
        isTagForcus: false            //blur和focus是防止被其他input的enter提交给影响
    };

    componentWillMount = () => {
        document.addEventListener('keypress', this.handleEnterKey);
    };

    componentDidMount = () => {
        document.removeEventListener('keypress', this.handleEenterKey);
    };

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (prevProps.videoData !== this.props.videoData) {
            this.setState({
                tagList: this.props.videoData.tags
            });
        }
    };

    //点击Enter键提交这个tag
    handleEnterKey = (e) => {
        if (e.keyCode === 13 && this.state.isTagForcus && !this.state.isTagBlur) {
            e.preventDefault();
            const content = this.refs.addTag.value;
            if (!content || content === '' || (typeof content === 'string' && content.trim().length === 0)) {
                alert('fill with something please...');
                return;
            }
            const newTagList = this.state.tagList;
            if (newTagList.includes(content)) {
                alert('fill with something different please...');
                return;
            }
            this.refs.addTag.value = '';
            newTagList.push(content);
            patchVideoTag({
                videoId: this.props.videoData.id,
                tag: content
            });
            this.setState({
                isTagAdd: false,
                isTagForcus: false,
                isTagBlur: true,
                tagList: newTagList
            });
        }
    }

    //click the add button to open input board
    handleClick = (e) => {
        e.preventDefault();
        const isUserA = !getSessionTokenJson() || getSessionTokenJson() === null;
        const userJSON = getSessionTokenJson();
        if (!isUserA) {
            if (userJSON.user.id === this.props.videoData.userId) {
                this.setState({
                    isTagAdd: true,
                    isTagForcus: true,
                    isTagBlur: false
                });
            } else {
                alert("only uploader can add tags >_<# !");
            }
        } else {
            history.push("/login");
        }
    };

    //监听tag输入筐的focus状态
    ifTagForcus = () => {
        this.setState({
            isTagForcus: true,
            isTagBlur: false
        });
    };

    //监听tag输入框的blur状态
    ifTagBlur = () => {
        this.setState({
            isTagForcus: false,
            isTagBlur: true,
            isTagAdd: false
        });
    };

    render = () => {
        const {tagList} = this.state;
        const solvedTageList = tagList && tagList;
        const tagListSec = (!solvedTageList || solvedTageList.length === 0) ? (
            <span key={-1}>no tags yet</span>
        ) : (
            solvedTageList.map((value, index) => {
                return (
                    <TagWrapper key={index}>
                        {value}
                    </TagWrapper>
                );
            })
        );
        const addTag = (this.state.isTagAdd) ? (
            <div>
                <input
                    className="add-input"
                    id="add-tag-input"
                    autoFocus="true"
                    placeholder="press <Enter>"
                    onKeyPress={e => this.handleEnterKey(e)}
                    onFocus={this.ifTagForcus}
                    onBlur={this.ifTagBlur}
                    type="text"
                    ref="addTag"
                />
            </div>
        ) : (
            <div>
                <div className="add-btn" onClick={e => this.handleClick(e)}>
                    <MdAdd className="add-icon"/>
                </div>
                <Text id="v_ant"/>
            </div>
        );
        return (
            <Fragment>
                <Wrapper>
                    {tagListSec}
                    {addTag}
                </Wrapper>
            </Fragment>
        );
    }
}

export default VideoTag;

VideoTag.propTypes = {
    videoData: PropTypes.object,
};

VideoTag.defaultProps = {
    videoData: {
        commentCount: 0,
        create: "",
        danCount: 0,
        description: "",
        favCount: 0,
        id: "",
        likeCount: 0,
        name: "",
        tags: [],
        thumbnailSrc: "",
        unlikeCount: 0,
        userId: "",
        videoSrc: "",
        viewCount: 0
    },
};
