import React, {Component, Fragment} from 'react';
import {Container} from "../entityDisplay/Container";
import Pagination from "../entityDisplay/Pagination";
import PropTypes from "prop-types";
import {NavItem} from "../Navigation";

const cellNum = 7; //max page display on pagination
const pageSize = 16; //video entity numbers in one page

class Video extends Component {
	state = {
		total: 1,           //total number of pages
		curr: 1,            //current page number
		videoSliceList: [], //display video entity list
	};

	componentDidUpdate = (prevProps, prevState, snapshot) => {
		if (prevProps.videoList !== this.props.videoList) {
			this.setState({
				total: Math.ceil(this.props.videoList.length / pageSize),
				curr: 1,
				videoSliceList: this.props.videoList.slice(0, pageSize)
			});
		}
	};

	handlePaginationClick = (value) => {
		const videoList = this.props.videoList.slice((value - 1) * pageSize, ((value - 1) * pageSize) + pageSize);
		this.setState({
			curr: value,
			videoSliceList: videoList,
		});
	};

	render = () => {
		return (
			<Fragment>
				<div>
					<Container
						list={this.state.videoSliceList}
						isLoading={this.props.isLoading}
						errMsg={this.props.errMsg}
						layout={"grid"}
						entityType={"video"}
					/>
				</div>
				<div>
					<Pagination
						total={this.state.total}
						curr={this.state.curr}
						cellNum={cellNum}
						passFatherState={this.handlePaginationClick}
					/>
				</div>
			</Fragment>
		);
	}
}

Video.propTypes = {
	videoList: PropTypes.arrayOf(PropTypes.object),
	isLoading: PropTypes.bool,
	errMsg: PropTypes.string,
};

Video.defaultProps = {
	videoList: [],
	isLoading: false,
	errMsg: null,
};

export default Video;
