import React from 'react';
import { connect } from 'react-redux';

import { getVideoListAction } from '../../actions/getVideoListActions';

class Filter extends React.Component {
  //改变filter的值后action
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      filter: this.refs.filter.value
    });
    this.props.getVideoListAction({
      filter: this.refs.filter.value,
      word: this.props.word
    });
  }

  render() {
    return (
      <div className="filter-selecter-section">
          Sort 
          <select
            className="select-section"
            //here the props.filter will be injected by when user clicked home nav at header more than once
            value={this.props.filter}
            onChange={e => this.handleChange(e)}
            ref="filter"
          >
            <option value="date">DATE</option>
            <option value="rate">RATE</option>
            <option value="view">VIEW</option>
          </select>
        </div>
    );
  }
}

Filter.defaultProps = {
  filter: 'date'
}

const mapStateToProps = ({ getVideoListReducer }) => {
  const { filter } = getVideoListReducer;
  return { filter };
};

export default connect(
  mapStateToProps, { getVideoListAction }
)(Filter);