import React, {Component, Fragment} from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import Text from './Text'

const Container = styled.div`
	width: 8rem;
	user-select: none;
`;

const Button = styled.div`
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

class Selector extends Component {
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
        this.props.passFatherState(value);
        this.setState({
            isClick: !this.state.isClick,
        });
    };

    render = () => {
        const options = this.state.isClick ? (
            <Wrapper>
                {this.props.options.map((value) => {
                    if (value === this.props.selectedOptions) {
                        return (<OptionsSelected key={value}><Text id={`se_o_${value}`}/></OptionsSelected>);
                    } else {
                        return (
                            <Options key={value} onClick={e => {
                                this.handleOptionCick(e, value)
                            }}><Text id={`se_o_${value}`}/></Options>
                        );
                    }
                })}
            </Wrapper>
        ) : null;
        return (
            <Fragment>
                <Container>
                    <Button onClick={e => this.handleSortButtonClick(e)}>{this.props.title}</Button>
                    {options}
                </Container>
            </Fragment>
        );
    };
}

Selector.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    options: PropTypes.arrayOf(PropTypes.string),
    selectedOptions: PropTypes.string,
    passFatherState: PropTypes.func,
};

Selector.defaultProps = {
    titel: null,
    options: ["null"],
    selectedOptions: "null",
    passFatherState: () => {
    },
};

export default Selector;
