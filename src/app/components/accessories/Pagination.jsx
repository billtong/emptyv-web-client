import React from 'react';
import { connect } from 'react-redux';
import { updateVideoPageAction } from '../../actions/getVideoListActions';
import { updateCommentPageAction } from '../../actions/getCommentListAction';

class Pagination extends React.Component {
  state = {
    currPage: 1,
    sizes: 8,
  }

  componentDidMount() {
    switch (this.props.tag) {
      case 'comment':
        this.props.updateCommentPageAction(this.state.currPage, this.state.sizes);
        break;
      case 'video' :
        this.props.updateVideoPageAction(this.state.currPage, this.state.sizes);
        break;
      default :
        break;
    }
  }

  componentWillReceiveProps(nextProps) {
    //如果改变了videoLit就初始化currPage为1
    if (this.props.list !== nextProps.list) {
      switch (this.props.tag) {
        case 'comment':
          this.props.updateCommentPageAction(1, this.state.sizes);
          break;
        case 'video' :
          this.props.updateVideoPageAction(1, this.state.sizes);
          break;
        default :
          break;
      }
      this.setState(prevState => ({
        ...prevState,
        currPage: 1
      }));
    }
  }

  render() {
    const list = this.props.list;
    const sizes = this.state.sizes;
    let pagination = null;
    if(list !== undefined && list.length > 0) {
      pagination = Array(list.length % sizes === 0 ? Math.floor(list.length / sizes) : (Math.floor(list.length / sizes)) + 1).fill(0);
      pagination = pagination.map((value, index) => {
        const changePage = (e) => {
          e.preventDefault();
          this.setState(prevState => ({
            ...prevState,
            currPage: index + 1,
          }));
          switch (this.props.tag) {
            case 'comment':
              this.props.updateCommentPageAction(index + 1, this.state.sizes);
              break;
            case 'video' :
              this.props.updateVideoPageAction(index + 1, this.state.sizes);
              break;
            default :
              break;
          }
          document.documentElement.scrollTop = 0;
        };
        return ((index + 1) === this.state.currPage) ? (
            <div key={index} className="index-text currPage-index-text">[{index + 1}]</div>
          ) : (
            <div key={index} className="index-text" onClick={e => changePage(e)}>{index + 1}</div>
          );
      });
    }
    return (
      <div className="pagination">{pagination}</div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps, { updateVideoPageAction, updateCommentPageAction }
)(Pagination);
