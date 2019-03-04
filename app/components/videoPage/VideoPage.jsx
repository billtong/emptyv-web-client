import React from 'react';
import ReactPlayer from 'react-player';
import { formatDateTime } from '../../utils/dateTools.jsx';
import CommentGrid from '../comment/CommentGrid.jsx';
import { Link } from 'react-router';
import postComment from '../../api/postComment.jsx';


class VideoPage extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const inputJson = {
      commentContent: this.refs.comment.value,
      videoId: this.props.location.query.videoId,
      userId: '1'
    };
    postComment.postComment(inputJson, 
      sessionStorage.getItem('emptyVideoLoginToken'), 
      sessionStorage.getItem('emptyVideoLoginSessionId')
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
    const token = sessionStorage.getItem('emptyVideoLoginToken');
    const sessionId = sessionStorage.getItem('emptyVideoLoginSessionId');
    const commentUploadBox = ((token === undefined || token == null || token.length <= 0) && (sessionId === undefined || sessionId == null || sessionId.length <= 0)) ? ( 
      <div className="sign-in-btn-section">
        <Link to="SignIn">Sign In To Leave a Comment</Link>
      </div>) : (
      <div className="comment-box">
        <input className="form-control"
          id="exampleInputUsername1"
          aria-describedby="usernameHelp"
          placeholder="leave a comment"
          ref="comment" />
        <button onClick={this.onSubmit}>shoot</button>
      </div>
    );
    return (
      <div className="video-page-main-section">
        <div className="video-player-section">
          <div>
            <ReactPlayer
              className='react-player'
              url={videoData.videoSrc}
              width='900px'
              height='430px' />
            <div className='video-info-siection'>
              <div className='video-title'>
                <h1>{videoData.vdeoName}</h1>
              </div>
              <div className='video-little-title-sectiton'>
                <div className='video-view-num'>
                  {videoData.videoViewNum}&nbsp;views&nbsp;&nbsp;
                </div>
                <div className='video-upload-data'>
                  {uploadDate}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="comment-write-block-section">
            {commentUploadBox}
        </div>
        <div className="comment-section">
            <CommentGrid videoId={videoData.videoId} />
        </div>
      </div>
    );
  }
}

module.exports = VideoPage;

