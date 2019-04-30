import React from 'react';
import { GoChevronLeft, GoChevronRight} from 'react-icons/go';
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
        case 'video':
          this.props.updateVideoPageAction(1, this.state.sizes);
          break;
        default:
          break;
      }
      this.setState(prevState => ({
        ...prevState,
        currPage: 1
      }));
    }
  }

  changePage = (e, index) => {
    e.preventDefault();
    this.setState(prevState => ({
      ...prevState,
      currPage: index + 1,
    }));
    switch (this.props.tag) {
      case 'comment': 
        this.props.updateCommentPageAction(index + 1, this.state.sizes);
        break;
      case 'video': 
        this.props.updateVideoPageAction(index + 1, this.state.sizes);
        break;
      default :
        break;
    }
    document.documentElement.scrollTop = 0;
  };

  render() {
    const list = this.props.list;
    const sizes = this.state.sizes;
    let pagination = null;
    if(list !== undefined && list.length > 0) {
      pagination = Array(list.length % sizes === 0 ? Math.floor(list.length / sizes) : (Math.floor(list.length / sizes)) + 1).fill(0);

      pagination = pagination.map((value, index) => {
        if (index - this.state.currPage >= -4&& index - this.state.currPage <= 2) {
          return ((index + 1) === this.state.currPage) ? (
            <div key={index} className="index-text currPage-index-text">[{index + 1}]</div>
          ) : (
            <div key={index} className="index-text" onClick={e => this.changePage(e, index)}>{index + 1}</div>
          );
        } 
        return null;
      });
    } else {
     pagination = (
      <div key='0' className="index-text currPage-index-text">[1]</div>
    );
    }

    const paginationWhole = !list || list.length === 0 ? (
      <div className="pagination">
        here is empty
      </div>
    ) : (
      <div className="pagination">
        <div className="index-text" onClick={e => {
        if(this.state.currPage > 1) {
          this.changePage(e, this.state.currPage-2);
        }
      }}><GoChevronLeft /></div>
      {pagination}
      <div className="index-text"  onClick={e => {
        const num = !pagination || pagination === null ? 1 : pagination.length;
        if (this.state.currPage < num) {
          this.changePage(e, this.state.currPage);
        }
      }}><GoChevronRight /></div>
       </div>
    );

    return (
      <React.Fragment>
        {paginationWhole}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps, { updateVideoPageAction, updateCommentPageAction }
)(Pagination);
