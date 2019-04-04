import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CommentGrid from '../accessories/comment/CommentGrid';
import Pagination from '../accessories/Pagination';
import { getSessionTokenJson } from '../../api/apiHelper';
import { postComment } from '../../api/comment';
import { getCommentListAction, completeGetComment} from '../../actions/getCommentListAction';

class AboutPage extends React.Component {

  static defaultProps = {
    videoId: 0,  //comment id是0时指aboutpage的评论
};

  state = {
    isBlur: true,
    isForcus: false,
  }

  componentWillMount() {
    document.addEventListener('keypress', this.handleEnterKey);
  }

  componentDidMount() {
    this.props.getCommentListAction({ videoId: this.props.videoId });
    document.removeEventListener('keypress', this.handleEenterKey);
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
      videoId: this.props.videoId,
      userId: getSessionTokenJson().user.userId,
      commentParentId: 0
    };
    postComment(inputJson)
    .then(() => {
      this.props.completeGetComment();    //先让commentList清零来重新加载commentlist
      this.props.getCommentListAction({ videoId: this.props.videoId });
    })
    .catch((err) => {
      alert(`failed post comment${err}`);
    });
  }
};

  render() {
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
            placeholder="Press <Enter> to leave a comment"
            type="text"
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
      <div className="about-us-page">
        <div className="about-us-container">
          <h1 className="title-text">Empty Video</h1>
          <h4 className="title-text">1.1.0325</h4>
          <section>
            <h2>Accounts Privileges</h2>
            <ul>
              <li>comment to a video</li>
              <li>like/unlike a video</li>
              <li>add video to your <p>favourite list</p></li>
              <li>record your history</li>
              <li>try <p>danmu</p> BETA</li>
            </ul>
          </section>
          <section>
            <h2>New Features Comming</h2>
            <ul>
              <li>share your own videos</li>
            </ul>
          </section>
          <section>
            <span>
              <h2>Join Us</h2>
              <li>Language: JavaScript, H5, <p>CSS</p>, <p>Python</p>, Java</li>
              <li>Framworks: <p>React.JS</p>, Spring, SpringMVC, Mybatis</li>
              <li>Email: <p>emptyvideos@outlook.com</p></li>
              <li>QQ: <p>2723230945</p></li>
              <li>FollowMe: <p><a href="https://github.com/billtong">GitHub Account</a></p></li>
            </span>
          </section>
          <div className="foot-text">
          <div>we create a free WORLD</div>
          <div> — emptyvideo team</div>
          </div>
        </div>
        
        <div className="comment-section">
          <div className="comment-write-block-section">
            {commentUploadBox}
          </div>
        <CommentGrid videoId={this.props.videoId} />
        {commentPagination}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ getCommentListReducer }) => {
  const { commentList } = getCommentListReducer;
  return { commentList };
};

export default connect(
  mapStateToProps, {
    getCommentListAction,
    completeGetComment
  }
)(AboutPage);
