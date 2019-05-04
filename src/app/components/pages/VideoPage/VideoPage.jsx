import React from 'react';
import { connect } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { Link } from 'react-router';

import VideoPlayer from '../../accessories/emptyplayer/VideoPlayer';
import Pagination from '../../accessories/Pagination';
import CommentGrid from '../../accessories/comment/CommentGrid';
import VideoTitle from './VideoTitle';
import VideoLittleTitle from './VideoLittleTitle';
import { getVideoActions } from '../../../actions/getVideoActions.jsx';
import { getCommentListAction, completeGetComment } from '../../../actions/getCommentListAction';
import { getUserHistoryAction } from '../../../actions/getUserHistoryAction';
import { getSessionTokenJson } from '../../../api/apiHelper';
import { patchOtherNum } from '../../../api/video.jsx';
import { postComment } from '../../../api/comment';

class VideoPage extends React.Component {
  state = {
    hasLike: false,
    hasUnlike: false,
    hasFav: false,
    isBlur: true,
    isForcus: false,
  }

  componentWillMount() {
    document.addEventListener('keypress', this.handleEnterKey);
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    //如果有历史记录需要读一下该视频like/unLike/Fav的情况，这里先调取历史记录
    if (getSessionTokenJson() !== null) {
      this.props.getUserHistoryAction();
    }
    this.props.getVideoActions(this.props.location.query.videoId);
    this.props.getCommentListAction({ videoId: this.props.location.query.videoId });
    document.removeEventListener('keypress', this.handleEenterKey);
  }

  //如果有历史记录，获取历史记录来决定操作键的状态
  componentWillReceiveProps=(nextProps) => {
    if (nextProps.history !== undefined && nextProps.history.length > 0) {
      //根据最新的状态来判断
      nextProps.history.reverse();
      nextProps.history.forEach(item => {
        if (item.videoId === parseInt(this.props.location.query.videoId, 0)) {
          switch (parseInt(item.action, 0)) {
            case 2:
              this.setState(prevState => ({
              ...prevState,
              hasLike: true,
              hasUnlike: false
              }));
              break;
            case 3:
              this.setState(prevState => ({
                ...prevState,
                hasLike: false,
                hasUnlike: true
              }));
              break;
            case 4:
              this.setState(prevState => ({
                ...prevState,
                hasFav: true
              }));
              break;
            default:
              break;
          }
        }
      });
    }
  }

  //将comment回复成undefined状态，方便刷新
  componentWillUnmount() {
    this.props.completeGetComment();
  }

  //点击视频操作键的提交方法
  //切换点赞，差评按钮的状态，可以点和不能点,
  ///收藏键一直都能点，因为用户可能回想要改变fav list，点击后还会弹出操作窗口
  handleClickAction = (e, myAction) => {
    e.preventDefault();
    const userJSON = getSessionTokenJson();
    if (!userJSON) {
      alert('please login or sign up a new account');
      return 0;
    }
    patchOtherNum({
      action: myAction,
      videoId: this.props.location.query.videoId,
      userId: userJSON.user.userId,
    }).then(() => {
      switch (myAction) {
        case 'like':
          this.setState(prevState => ({
            ...prevState,
            hasLike: true,
            hasUnlike: false
          }));
          break;
        case 'unlike':
          this.setState(prevState => ({
            ...prevState,
            hasUnlike: true,
            hasLike: false
          }));
          break;
        case 'favourite':
          this.setState(prevState => ({
            ...prevState,
            hasFav: true
          }));
          break;
        default:
      }
    }).catch(() => {
      alert('failed, pleas login or sign up');
    });
  }

  //这个是comment的输入栏的提交法方法
  handleEnterKey=(e) => {
    if (e.keyCode === 13 && this.state.isForcus && !this.state.isBlur) {
      const comment = this.refs.comment.value;
      if (!comment || comment === null || comment === '' || (typeof comment === 'string' && comment.trim().length === 0)) {
        alert('fill with something please...');
        return;
    }
      this.refs.comment.value = '';
      const inputJson = {
        commentContent: comment,
        videoId: this.props.location.query.videoId,
        userId: getSessionTokenJson().user.userId,
        commentParentId: 0
      };
      postComment(inputJson)
      .then(() => {
        this.props.completeGetComment();    //先让commentList清零来重新加载commentlist
        this.props.getCommentListAction({ videoId: this.props.location.query.videoId });
      })
      .catch((err) => {
        alert(`failed post comment${err}`);
      });
    }
  };

  render() {
    const videoData = this.props.videoData;
    const loadingIcon = (this.props.isLoading) ? (
      <div className="loader">
        <RingLoader color={'#d9d9d9'} />
      </div>
    ) : null;
    const errText = (!this.props.error) ?
      null : (
      <div className="error">
        <div className="badge badge-danger">
          {this.props.error}
        </div>
      </div>
    );
    const videoPlayer = this.props.videoData === undefined ? null : (
      <VideoPlayer
        className='react-player'
        video={{
          thumbnail_url: videoData.videoThumbnailImg,
          video_url: videoData.videoSrc,
          video_id: videoData.videoId
        }}
      />
    );

    const token = getSessionTokenJson();
    const commentUploadBox = (!token || token === null) ?
      (
        <Link to="SignIn">Sign In To Leave a Comment</Link>
      ) :
      (
        <div className="comment-box">
          <input
            className="form-control comment-content"
            id="comment-box"
            autoComplete="off"
            placeholder="Press <Enter> to leave a comment"
            onKeyPress={e => this.handleEnterKey(e)}
            onFocus={() => {
              this.setState(prevState => ({
                ...prevState,
                isForcus: true,
                isBlur: false
              }));
            }}
            onBlur={() => {
              this.setState(prevState => ({
                ...prevState,
                isForcus: false,
                isBlur: true
              }));
            }}
            ref="comment"
          />
        </div>
      );

    const commentPagination = (!this.props.commentList) ? null : (
      <Pagination
        list={this.props.commentList}
        tag="comment"
      />
    );
    return (
      <div className="video-page-main-section">
        {loadingIcon}
        {errText}
        <div className="video-player-section">
          {videoPlayer}
          <div className='video-info-section'>
            <VideoTitle
              hasLike={this.state.hasLike}
              hasUnlike={this.state.hasUnlike}
              hasFav={this.state.hasFav}
              videoData={this.props.videoData}
              handleClickAction={this.handleClickAction}
              videoId={this.props.location.query.videoId}
            />
            <VideoLittleTitle videoData={this.props.videoData} />
          </div>
        </div>
        <div className="comment-section">
          <div className="comment-write-block-section">
            {commentUploadBox}
          </div>
        <CommentGrid videoId={this.props.location.query.videoId} />
        {commentPagination}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ getVideoReducer, getCommentListReducer, getUserHistoryReducer }) => {
  const { videoData, isLoading, error } = getVideoReducer;
  const { commentList } = getCommentListReducer;
  const { history } = getUserHistoryReducer;
  return { videoData, isLoading, error, commentList, history };
};

export default connect(
  mapStateToProps, {
    getVideoActions,
    getCommentListAction,
    completeGetComment,
    getUserHistoryAction
  }
)(VideoPage);
