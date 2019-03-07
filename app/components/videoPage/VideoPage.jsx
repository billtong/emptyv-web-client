import React from 'react';
import { Link } from 'react-router';
import { MdThumbUp, MdThumbDown} from 'react-icons/md';
import { IoIosHeart } from 'react-icons/io';
import ReactPlayer from './VideoPlayer.jsx';
import { formatDateTime } from '../../utils/dateTools.jsx';
import CommentGrid from '../comment/CommentGrid.jsx';
import postComment from '../../api/postComment.jsx';


class VideoPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const userJSON = JSON.parse(sessionStorage.getItem('empty-video-web-user-session'));
    const inputJson = {
      commentContent: this.refs.comment.value,
      videoId: this.props.location.query.videoId,
      userId: userJSON.user.userId
    };
    postComment.postComment(inputJson, 
      userJSON.userToken,
      userJSON.userSessionId
    ).then((res) => {
      window.location.reload();
    }).catch((err) => {
      alert(`failed post comment${err}`);
    });
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    const videoData = this.props.location.query;
    const uploadDate = formatDateTime(parseInt(videoData.videoDate));
    const token = sessionStorage.getItem('empty-video-web-user-session');
    const commentUploadBox = (!token || token.length <= 0) ? 
      ( 
        <Link to="SignIn">Sign In To Leave a Comment</Link>
      ) : 
      (
        <div className="comment-box">
          <input 
            className="form-control comment-content"
            id="exampleInputUsername1"
            aria-describedby="usernameHelp"
            placeholder="leave a comment"
            ref="comment" 
          />
          <input
            className="form-control comment-btn"
            type="button"
            value="shoot"
            onClick={this.onSubmit}
          />
        </div>
    );
    return (
      <div className="video-page-main-section">
        <div className="video-player-section">
          <ReactPlayer
            className='react-player'
            video={{
              thumbnail_url: 'https://video.safalnews.com/wp-content/plugins/video-thumbnails/default.jpg',
              video_url: 'https://s1.sonkwo.com/ls-KzR9iZO8zIu3AtVvD0yeGJhZV'
            }}
          />
          <div className='video-info-section'>
            <div className='video-title'>
              <h1>{videoData.videoName}</h1>
              <div className='video-action-action thumb-up-section'>
                <MdThumbUp />Good 
              </div>
              <div className='video-action-action thumb-down-action'>
                <MdThumbDown />
              </div>
              <div className='video-action-action love-action'>
                <IoIosHeart />
              </div>
            </div>
            <div className='video-little-title-sectiton'>
              <div className='video-view-num'>
                {videoData.videoViewNum} views
              </div>
              <div className='video-upload-data'>
                Published on {uploadDate}
              </div>
            </div>
          </div>
        </div>
        <div className="comment-section">
          <div className="comment-write-block-section">
            {commentUploadBox}
          </div>
          <CommentGrid videoId={videoData.videoId} />
        </div>
      </div>
    );
  }
}

module.exports = VideoPage;

