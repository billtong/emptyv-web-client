import React, { Component, Fragment } from 'react';
import { withRouter } from "react-router-dom";

import XHelmet from "../../components/accessories/XHelmet.js";
import Filter from "../../components/accessories/entityDisplay/Filter.js";
import Pagination from "../../components/accessories/entityDisplay/Pagination";
import {getVideoList} from "../../utils/api/video";
import {Container} from "../../components/accessories/entityDisplay/Container";

class Home extends Component{
  state = {
    options: ["date", "rate", "view"],
	  sort: "date",
    total: 1,           //总页数
    curr: 1,            //当前页数
    cellNum: 7,         //pagination上展示的页数
	  pageSize: 16,       //一夜里的视频数
	  videoList: [],      //总的视频list
	  videoSliceList: [], //展示的视频list
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
			this.setState({errMsg: "Sorry...we ain\\'t able to serve any videos rn", isLoading: true});
		});
	};

  render() {
    return(
      <Fragment>
        <XHelmet title={"Empty Video"} />
        <div>
          <Filter options={this.state.options} selectedOptions={this.state.sort} changeFatherState={this.handleOptionClick}/>
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
            changeFatherState={this.handlePaginationClick}
          />
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Home)
