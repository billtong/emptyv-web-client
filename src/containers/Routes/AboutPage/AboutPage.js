import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Text from '../../../components/accessories/Text';

import "./AboutPage.css";
import XHelmet from "../../../components/accessories/XHelmet";
import {connect} from "react-redux";
import {Container} from "../../../components/accessories/entityDisplay/Container";
import {getCommentListAction} from "../../../store/actions/getCommentListAction";

const aboutId = 0;

class AboutPage extends Component {
	state = {
		total: 1,           //total number of pages
		curr: 1,            //current page number
		cellNum: 7,         //max page display on pagination
		pageSize: 20,       //video entity numbers in one page
		commentList: this.props.commentList,
		commentSliceList: [],
	}
	componentDidMount = () => {
		this.props.getCommentListAction({videoId: aboutId});
	};

	render = () => {
		return (
			<div className="about-us-page">
				<XHelmet title={"About Us"}/>
				<div className="about-us-container">
					<h1 className="title-text">Empty Video</h1>
					<h4 className="title-text">1.2.0510</h4>
					<section>
						<h2><Text id="abs1"/></h2>
						<ul>
							<li><Text id="abl1_1"/></li>
							<li><Text id="abl1_2"/></li>
							<li><Text id="abl1_3"/></li>
							<li><Text id="abl1_4"/></li>
						</ul>
					</section>
					<section>
						<h2><Text id="abs2"/></h2>
						<ul>
							<li><Text id="abl2_1"/></li>
							<li><Text id="abl2_2"/></li>
							<li><Text id="abl2_3"/></li>
							<li><Text id="abl2_4"/></li>
						</ul>
					</section>
					<section>
            <span>
              <h2><Text id="abs3"/></h2>
              <li><Text id="abl3_1"/>Java, Golang, JavaScript, H5, CSS</li>
              <li><Text id="abl3_2"/>React, Spring Boot, Spring Cloud</li>
              <li><Text id="abl3_3"/>Docker, Jenkins</li>
              <li><Text id="abl3_4"/><p>emptyvideos@outlook.com</p></li>
              <li><Text id="abl3_5"/><p><a href="https://github.com/billtong">GitHub Account</a></p></li>
            </span>
					</section>
					<div className="foot-text">
						<div><Text id="abf"/></div>
						<div> — Empty Video Team</div>
					</div>
				</div>

				<div>
					<Container
						list={this.props.commentList}
						isLoading={this.props.isLoading}
						errMsg={this.props.error}
						layout={"verti-list"}
						entityType={"comment"}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({getCommentListReducer}) => {
	const {isLoading, commentList, error} = getCommentListReducer;
	return {isLoading, commentList, error};
};

export default withRouter(connect(
	mapStateToProps, {
		getCommentListAction
	}
)(AboutPage));
