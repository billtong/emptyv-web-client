import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";

import XHelmet from "../../components/accessories/XHelmet.js";
import Text from "../../components/accessories/Text";
import Selector from "../../components/accessories/Selector";
import Pagination from "../../components/accessories/entityDisplay/Pagination";
import {getVideoList} from "../../utils/api/video";
import {Container} from "../../components/accessories/entityDisplay/Container";

const options = ["date", "rate", "view"];

class Home extends Component{
  state = {
	  sort: "date",
    total: 1,           //total number of pages
    curr: 1,            //current page number
    cellNum: 7,         //max page display on pagination 
	  pageSize: 16,       //video entity numbers in one page
	  videoList: [],      //total video entity list
	  videoSliceList: [], //display video entity list
	  isLoading: false,
	  errMsg: undefined,
  };

	componentDidMount() {
		this.getVideosFromAPI(this.state.sort);
	}

	handleOptionClick = (value) => {
    this.setState({sort: value});
		this.getVideosFromAPI(value);
  };

	handlePaginationClick = (value) => {
		const {pageSize} = this.state;
		const totalVideoList =this.state.videoList;
		const videoList =totalVideoList.slice((value - 1) * pageSize, ((value - 1) * pageSize )+ pageSize);
	  this.setState({
		  curr: value,
		  videoSliceList: videoList,
	  });
  };

	getVideosFromAPI = (sort) => {
		this.setState({ isLoading: true });
		getVideoList({
			filter: sort,
		}).then((res)=>{
			const { pageSize} = this.state;
			const totalVideoList = res.data.videoList;
			this.setState({
				videoList: totalVideoList,
				isLoading: false,
				videoSliceList: totalVideoList.slice(0, pageSize),
				total: Math.ceil(totalVideoList.length / pageSize)
			});
		}).catch((err)=>{
			this.setState({errMsg: "Sorry...we ain\\'t able to serve any videos rn", isLoading: false});
		});
	};
  render() {
		const selectorTitle = (
			<Text id={"se_title"}/>
		);
		return(
      <Fragment>
        <XHelmet title={"Empty Video"} />
        <div>
					<Selector
						title={selectorTitle} 
						options={options} 
						selectedOptions={this.state.sort} 
						passFatherState={this.handleOptionClick}
					/>
        </div>
	      <div>
					<Container
						list={this.state.videoSliceList}
			      isLoading={this.state.isLoading}
						errMsg={this.state.errMsg}
						layout={"grid"}
					/>
	      </div>
        <div>
          <Pagination
	          total={this.state.total}
            curr={this.state.curr}
            cellNum={this.state.cellNum}
            passFatherState={this.handlePaginationClick}
          />
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Home)
