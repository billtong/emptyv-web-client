import React from 'react';
import { connect } from 'react-redux';
import { updateVideoPageAction } from '../../actions/getVideoListActions';
import { updateCommentPageAction } from '../../actions/getCommentListAction';

class Pagination extends React.Component {
  state = {
    currPage: 1,
    sizes: 5
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

  render() {
    const list = this.props.list;
    const sizes = this.state.sizes;
    const pagination = (!list) ? null : 
    Array(...{ length: list.length % sizes === 0 ? list.length / sizes : (list.length / sizes) + 1 }).map((value, index) => {
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

    return (
      <div className="pagination">{pagination}</div>
    );
  }
}
const mapStateToProps = state => state;
module.exports = connect(
  mapStateToProps, { updateVideoPageAction, updateCommentPageAction }
)(Pagination);

