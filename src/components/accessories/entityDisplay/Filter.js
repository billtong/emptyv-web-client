import React, {Fragment, Component} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";


const Container = styled.div`
	width: 8rem;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;

const Button = styled.div`
	padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    color: grey;
  }
`;

const Wrapper = styled.ul`
	position: absolute;
	margin-block-start: 0;
	margin-block-end: 0;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	padding-inline-start: 1rem;
`;

const Options = styled.li`
	display:block;
	cursor: pointer;
	text-align: left;
`;

const OptionsSelected = styled.li`
	display:block;
	cursor: pointer;
	text-align: left;
	color: red
`;

class Filter extends Component{
	state = {
		isClick: false,
	};

	handleSortButtonClick = (e) => {
		e.preventDefault();
		this.setState({
			isClick: !this.state.isClick,
		});
	};

	handleOptionCick = (e, value) => {
		e.preventDefault();
		if(this.props.changeFatherState) {
			this.props.changeFatherState(value);
		}
		this.setState({
			isClick: !this.state.isClick,
		});
	};

	render = () => {
		const options = this.state.isClick ? (
			<Wrapper>
				{this.props.options.map((value) => {
					console.log("value", value);
					console.log("selected", this.props.selectedOptions);
					if (value === this.props.selectedOptions) {
						return (<OptionsSelected key={value}>{value}</OptionsSelected>);
					} else {
						return (
							<Options key={value} onClick={e=>{this.handleOptionCick(e, value)}}>{value}</Options>
						);
					}
				})}
			</Wrapper>
		) : null;
		return (
			<Fragment>
				<Container>
					<Button onClick={e => this.handleSortButtonClick(e)}>Sort By</Button>
					{options}
				</Container>
			</Fragment>
		);
	};
}

Filter.propTypes =  {
	options: PropTypes.arrayOf(PropTypes.string),
	selectedOptions: PropTypes.string,
	changeFatherState: PropTypes.func,
};

Filter.defaultProps = {
	options: ["null"],
	selectedOptions: "null",
	changeFatherState: undefined,
};

export default Filter;
