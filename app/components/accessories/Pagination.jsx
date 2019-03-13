import React from 'react';
import { connect } from 'react-redux';
import { getVideoListAction } from '../../actions/getVideoListActions';

class Pagination extends React.Component {
  render() {
    const pagination = (this.props.list === undefined || this.props.totalPages === undefined) ? null : 
    Array(...{ length: this.props.totalPages }).map((value, index) => {
      const changePage = (e) => {
        e.preventDefault();
        const inputJson = { 
          currPage: (index + 1),
          sizes: this.props.sizes,
          filter: this.props.filter,
          word: this.props.word
        };
        this.props.getVideoListAction(inputJson);
        document.documentElement.scrollTop = 0; 
      };
      return ((index + 1) === this.props.currPage) ? (
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

const mapStateToProps = (state) => (state);

module.exports = connect(
  mapStateToProps, { getVideoListAction }
)(Pagination);

